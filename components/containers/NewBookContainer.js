import React from 'react';

import TitlePage from './../presentational/TitlePage'
import QuotePage from './../presentational/QuotePage'
import CommentPage from './../presentational/CommentPage'
import MainButton from './../presentational/MainButton'
import Steps from './../presentational/Steps'
import * as base from './../../assets/styles/base';

import * as bookActions from './../../core-modules/actions/bookActions'
import * as navigationActions from './../../core-modules/actions/navigationActions'

import { View, FlatList, Text, Animated, Dimensions, StyleSheet, ScrollView, Keyboard, Easing } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

class NewBookContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentStep: 0,
      stepOffset: new Animated.Value(0),
      keyboardAvoiding: new Animated.Value(0),
      book: {},
      quote: {}, 
      comment: {}
    }

    this.nextStep = this.nextStep.bind(this)

    this.handleBook = this.handleBook.bind(this)
    this.handleQuote = this.handleQuote.bind(this)
    this.handleComment = this.handleComment.bind(this)
  }

  steps = ['Livre','Citation','Commentaire']
  

  componentDidMount() {
    this._keyboardWillShow = this._keyboardWillShow.bind(this)
    this._keyboardWillHide = this._keyboardWillHide.bind(this)
    this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  // Hide bottom actions when keyboard show, show them otherwise
  _keyboardWillHide(e){
    Animated.timing(this.state.keyboardAvoiding, {
      toValue: 0,
      duration: e.duration,
      easing: Easing.bezier(0.1, 0.76, 0.55, 0.9)
    }).start()
  }

  _keyboardWillShow(e){
    Animated.timing(this.state.keyboardAvoiding, {
      toValue: 248,
      duration: e.duration,
       easing: Easing.bezier(0.1, 0.76, 0.55, 0.9)
    }).start()
  }


  nextStep(){
    if (this.state.currentStep < 2){
      Animated.timing(this.state.stepOffset, {
        toValue: this.state.currentStep + 1,
        duration: 200
      }).start(() => this.setState(
        (prevState, props) => ({
          currentStep: prevState.currentStep + 1
        })
      ))
    }
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
        overflow:'hidden',
        backgroundColor: 'white',
        alignItems: 'center',
        width: width - 2 * base.padding.md,
        paddingTop: base.padding.xs,
        paddingBottom: base.padding.md, 
        marginHorizontal: base.padding.md
      }
    })
    return (
      <Animated.View style={styles.container}>
        <Animated.View style={[
          styles.inputView, {
            left: this.state.stepOffset.interpolate({
              inputRange: [0, 2],
              outputRange: [0, - 2 * width]
            }),
          }
        ]}>
          
          <TitlePage handleBook={this.handleBook} />
          <QuotePage handleQuote={this.handleQuote} />
          <CommentPage handleComment={this.handleComment} />
         
        </Animated.View>

        <Animated.View style={[
          styles.bottomActions, {
            height: this.state.keyboardAvoiding.interpolate({
              inputRange:[0, 248],
              outputRange:[136, 0]
            })
          }
        ]}>
          
        
          <Steps steps={this.steps} activeIndex={this.state.currentStep}/>
          <Animated.View style={[
            styles.bar, {
              left: this.state.stepOffset.interpolate({
                inputRange: [0, 2],
                outputRange:[0, 2 * (width - 52) / 3]
              }),
            }
          ]}/>
          <MainButton height={40} legend="Suivant" onPress={this.nextStep}/>

        </Animated.View>
      </Animated.View>
    )
  }
}

function mapStateToProps(state){
  return {
    jwt: state.session.jwt,
    books: state.books
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({}, bookActions, navigationActions),dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewBookContainer)