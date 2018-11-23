import React from 'react';

import appearsFromRight from './appearsFromRight'
import BookHomePage from './../presentational/BookHomePage'
import BookFormPage from './../presentational/BookFormPage'

import * as base from './../../assets/styles/base';

import * as bookActions from './../../core-modules/actions/bookActions'
import * as flowActions from './../../core-modules/actions/flowActions'


import { View, Text, Dimensions, ScrollView, StyleSheet, Animated } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

class BookEditContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      form: '',
      stepOffset: new Animated.Value(0),
      edit:{}
    }
    this.goToStep = this.goToStep.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleNew = this.handleNew.bind(this)
    this.submitEdit = this.submitEdit.bind(this)
    this.submitNew = this.submitNew.bind(this)
  }

  componentDidMount(){
    this.props.actions.startFlow()
    this.props.actions.readBook({
      jwt: this.props.jwt, 
      id: this.props.match.params.id
    }, 'mobile')
  }
 
  componentWillUnmount(){
    this.props.actions.cleanFlow()
    this.props.actions.cleanCurrentBook()
  }

  goToStep(action,type,payload){
    let item = type === 'edit' && payload.type === 'quote' ?
      {
        type: payload.type, 
        id: payload.id,
        content: this.props.book.quotes.find(quote => quote.quote.id === payload.id).quote
      } : type === 'edit' && payload.type === 'comment' ?
        {
          type: payload.type, 
          id: payload.id,
          content: this.props.book.quotes.find(quote => 
            quote.quote.id === payload.quoteId
          ).comments.find(comment => comment.id === payload.id) 
        } : null

    this.setState({
      form: type,
      payload: item,
      edit: type === 'back' ? {} : Object.assign({}, {
        type: payload.type, 
        id: payload.id
      })
    })

    Animated.timing(this.state.stepOffset, {
      toValue: this.props.flow.step + action,
      duration: 200
    }).start(
      () => this.props.actions.updateFlow({
        next: action, 
        title: type === 'new' ? 'Nouvelle citation' : type === 'edit' ? 'Modifier' : this.props.book.book.title, 
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
    this.props.actions.updateDependents({jwt: this.props.jwt, edit: this.state.edit}, 'mobile')
    this.goToStep(-1, 'back')
    this.props.actions.readBook({
      jwt: this.props.jwt, 
      id: this.props.match.params.id
    }, 'mobile')
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
    
    return (
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
            goToStep={this.goToStep}
          />
          <BookFormPage
            form={this.state.form}
            goToStep={this.goToStep}
            payload={this.state.payload}
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
    flow: state.flow
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({}, bookActions, flowActions), dispatch)
  }
}
export default appearsFromRight(connect(mapStateToProps, mapDispatchToProps)(BookEditContainer))