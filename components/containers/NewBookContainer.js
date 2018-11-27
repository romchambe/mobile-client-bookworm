import React from 'react';

import AssetLoader from './../AssetLoader'
import TitlePage from './../presentational/TitlePage'
import QuotePage from './../presentational/QuotePage'
import CommentPage from './../presentational/CommentPage'
import MainButton from './../presentational/MainButton'
import Steps from './../presentational/Steps'
import * as base from './../../assets/styles/base';

import * as bookActions from './../../core-modules/actions/bookActions'
import * as flowActions from './../../core-modules/actions/flowActions'
import * as navigationActions from './../../core-modules/actions/navigationActions'

import { View, Text, Animated, Dimensions, StyleSheet, ScrollView, Keyboard, Easing } from 'react-native';
import appearsFromRight from './appearsFromRight'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

class NewBookContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      stepOffset: new Animated.Value(0),
      book: {},
      quote: {}, 
      comment: {},
      extracted: false
    }

    this.goToStep = this.goToStep.bind(this)

    this.postBook = this.postBook.bind(this)
    this.handleBook = this.handleBook.bind(this)
    this.handleQuote = this.handleQuote.bind(this)
    this.handleComment = this.handleComment.bind(this)
  }

  steps = ['Livre','Citation','Commentaire']

  componentDidMount(){
    this.props.actions.startFlow()

    if (!!this.props.flow.payload.book){
      this.setState({
        book: this.props.flow.payload.book,
        comment: this.props.flow.payload.comment,
        quote: {content: this.props.flow.payload.response},
        extracted: true
      })
    }

    console.log(this.state)
  }

  componentWillUnmount(){
    this.props.actions.transmitData({
      from: 'new', 
      payload:{
        book: this.state.book, 
        comment: this.state.comment
      }
    })
  }

  goToStep(action){
    if (this.props.flow.step + action < 3 && this.props.flow.step + action > -1){
      Animated.timing(this.state.stepOffset, {
        toValue: this.props.flow.step + action,
        duration: 200
      }).start(
        () => this.props.actions.updateFlow({
          next: action, 
          title: this.steps[this.props.flow.step + action], 
          back: () => this.goToStep(-1) 
        })
      )  
    }
  } 

  postBook(payload){
    this.props.actions.createBook(payload, 'mobile')
  }

  handleBook(payload){
    this.setState(
      (prevState, props) => ({
        book: Object.assign({}, prevState.book, payload)
      })
    )
  }

  handleQuote(payload){
    this.setState(
      (prevState, props) => ({
        quote: Object.assign({}, prevState.quote, payload)
      })
    )
  }

  handleComment(payload){
    this.setState(
      (prevState, props) => ({
        comment: Object.assign({}, prevState.comment, payload)
      })
    )
  }

  render() {
    const { width, height } = Dimensions.get('window')
  
    const styles = StyleSheet.create({
      container: {
        flex:1,
      },
      inputView: {
        position: 'absolute',
        top: 0,
        width: 3 * width,
        height: height - 212,
        paddingTop: base.padding.lg,
        flexDirection: 'row'
      }, 
      bar:{
        width: (width - 60) / 3,
        height: 3,
        backgroundColor: base.colors.blue,
        position: 'absolute',
        top: 53,
        zIndex: 10
      },
      bottomActions:{
        position:'absolute',
        left: 0,
        bottom: 0,
        height: 136,
        overflow:'hidden',
        backgroundColor: 'white',
        alignItems: 'center',
        width: width - 2 * base.padding.md,
        paddingTop: base.padding.xs,
        paddingBottom: base.padding.md, 
        marginHorizontal: base.padding.md
      }
    })

    let { stepOffset, ...payload } = this.state

    return this.props.fetching ? <AssetLoader /> : (
      <View style={styles.container}>
        <Animated.View style={[
          styles.inputView, {
            left: this.state.stepOffset.interpolate({
              inputRange: [0, 2],
              outputRange: [0, - 2 * width]
            }),
          }
        ]}>
          
          <TitlePage 
            handleBook={this.handleBook} 
            swipeMode={-1} 
            onDismiss={this.goToStep} 
            preview={this.props.flow.payload.response}
            book={this.state.book}
            extracted={this.state.extracted}
          />
          <QuotePage 
            handleQuote={this.handleQuote} 
            swipeMode={0} 
            onDismiss={this.goToStep}
            preview={this.props.flow.preview}
            goToScan={this.props.actions.navigateToScan}
            quote={this.state.quote}
            extracted={this.state.extracted}
          />
          <CommentPage 
            handleComment={this.handleComment} 
            swipeMode={1} 
            onDismiss={this.goToStep} 
            comment={this.state.comment}
          />
         
        </Animated.View>

        <Animated.View style={styles.bottomActions}>
          
        
          <Steps steps={this.steps} activeIndex={this.props.flow.step}/>
          <Animated.View style={[
            styles.bar, {
              left: this.state.stepOffset.interpolate({
                inputRange: [0, 2],
                outputRange:[0, 2 * (width - 42) / 3]
              }),
            }
          ]}/>
          <MainButton 
            height={40} 
            legend={ this.props.flow.step === 2 ? "Sauvegarder" : "Suivant"}  
            onPress={
              this.props.flow.step === 2 ? 
              () => this.postBook({jwt: this.props.jwt, ...payload}) : 
              () => this.goToStep(1)
            }
          />

        </Animated.View>
      </View>
    )
  }
}

function mapStateToProps(state){
  return {
    jwt: state.session.jwt,
    books: state.books,
    flow: state.flow,
    fetching: state.fetching
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({}, bookActions, navigationActions, flowActions),dispatch)
  }
}
export default appearsFromRight(connect(mapStateToProps, mapDispatchToProps)(NewBookContainer))