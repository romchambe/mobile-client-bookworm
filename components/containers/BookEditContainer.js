import React from 'react';

import AssetLoader from './../AssetLoader'
import appearsFromRight from './appearsFromRight'
import BookHomePage from './../presentational/BookHomePage'
import BookFormPage from './../presentational/BookFormPage'

import * as base from './../../assets/styles/base';

import * as bookActions from './../../core-modules/actions/bookActions'
import * as flowActions from './../../core-modules/actions/flowActions'
import * as quoteActions from './../../core-modules/actions/quoteActions'


import { View, Text, Dimensions, ScrollView, StyleSheet, Animated } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

class BookEditContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      form: '',
      stepOffset: new Animated.Value(0),
      quote:{},
      comment:{},
      edit:{}
    }
    this.goToStep = this.goToStep.bind(this)
    this.handleItemForEdit = this.handleItemForEdit.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleNew = this.handleNew.bind(this)
    this.submitEdit = this.submitEdit.bind(this)
    this.submitNew = this.submitNew.bind(this)
  }

  componentDidMount(){
    this.origin = this.props.flow.from
    this.props.actions.startFlow({from: 'edit'})

    if (this.origin === 'scan' && !!this.props.flow.payload.response){
      this.props.actions.createQuote({
        jwt: this.props.jwt,
        quote:{
          book_id: this.props.match.params.id,
          content: this.props.flow.payload.response,
          title: 'Citation'
        }
      }, 'mobile')
    }

    this.props.actions.readBook({
      jwt: this.props.jwt, 
      id: this.props.match.params.id
    }, 'mobile')
  }
 
  componentWillUnmount(){
    this.props.actions.transmitData({
      payload:{
        id: this.props.match.params.id
      }
    })
    this.props.actions.cleanCurrentBook()
  }

  handleItemForEdit(item){
    if (item.type === 'quote'){
      this.setState({
        form: 'edit',
        quote: this.props.book.quotes.find(quote => quote.quote.id === item.id).quote
      })
    } else if (item.type === 'comment'){
      this.setState({
        form:'edit',
        comment: this.props.book.quotes.find(quote => 
          quote.quote.id === payload.quoteId
        ).comments.find(comment => comment.id === payload.id) 
      })
    }

    this.goToStep(1)
  }

  goToStep(action){
    Animated.timing(this.state.stepOffset, {
      toValue: this.props.flow.step + action,
      duration: 200
    }).start(
      () => this.props.actions.updateFlow({
        next: action, 
        title:  this.state.form === 'new' ? 'Nouvelle citation' : 
          this.state.form === 'edit' ? "Modifier l'élément" : this.props.book.book.title, 
        back: () => this.goToStep(-1, 'back') 
      })
    )
  } 

  handleEdit(payload){
    this.setState(
      (prevState, props) => ({
        edit: Object.assign({}, prevState.edit, payload)
      })
    )
  }

  handleNew(){

    
  }

  submitEdit(){
    this.props.actions.updateDependents({jwt: this.props.jwt, edit: this.state.edit}, 'mobile').then( 
      () => {
        this.props.actions.readBook({
          jwt: this.props.jwt, 
          id: this.props.match.params.id
        }, 'mobile').then(() => this.goToStep(-1, 'back'))
      }
    )
  }

  submitNew(){
    
  }

  render () {
    const { width, height } = Dimensions.get('window')

    const styles = StyleSheet.create({
      container: {
        flex:1,
      },
      inputView: {
        position: 'absolute',
        top: 0,
        width: 2 * width,
        flexDirection: 'row',
        height: height - 76
      }, 
    })
    
    return this.props.fetching ? <AssetLoader /> : (
      <Animated.View style={styles.container}>
        <Animated.View style={[
          styles.inputView, {
            left: this.state.stepOffset.interpolate({
              inputRange: [0, 1],
              outputRange: [0, - width]
            }),
          }
        ]}>
          <BookHomePage
            book={this.props.book}
            handleItemForEdit={this.handleItemForEdit}
          />
          <BookFormPage
            form={this.state.form}
            goToScan={this.props.actions.navigateToScan}
            goToStep={this.goToStep}
            handleForm={this.state.form === 'edit' ? this.handleEdit : this.handleNew}
            handleSubmit={this.state.form === 'edit' ? this.submitEdit : this.submitNew}
          />
        </Animated.View>
      </Animated.View>
    )
  }
}

function mapStateToProps(state){
  return {
    jwt: state.session.jwt,
    book: state.books.currentBook,
    flow: state.flow,
    fetching: state.fetching
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({}, bookActions, flowActions, quoteActions), dispatch)
  }
}
export default appearsFromRight(connect(mapStateToProps, mapDispatchToProps)(BookEditContainer))