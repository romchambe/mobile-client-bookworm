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
      offset: new Animated.Value(1),
      keyboardAvoiding: new Animated.Value(0)
    }

    this.createBook = this.createBook.bind(this)
    this.nextStep = this.nextStep.bind(this)
  }

  steps = ['Livre','Citation','Commentaire']
  
  componentDidMount() {
    this._keyboardWillShow = this._keyboardWillShow.bind(this)
    this._keyboardWillHide = this._keyboardWillHide.bind(this)
    this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
    
    Animated.timing(this.state.offset, {
      toValue: 0,
      duration: 200,
    }).start()
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

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

  async createBook() {
    await this.props.actions.createBook({jwt: this.props.jwt}, 'mobile');
    this.props.actions.navigateToEdit();
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

  render () {
    const { width, height } = Dimensions.get('window')
  
    const styles = StyleSheet.create({
      container: {
        flex:1,
        marginHorizontal: - base.padding.md,
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
      <Animated.View style={
        [styles.container, {
          transform: [{
            translateX: this.state.offset.interpolate({
              inputRange: [0, 1],
              outputRange: [0, width]
            })
          }] 
        }]
      }>
        <Animated.View style={[
          styles.inputView, {
            left: this.state.stepOffset.interpolate({
              inputRange: [0, 2],
              outputRange: [0, - 2 * width]
            }),
          }
        ]}>
          
          <TitlePage />
          <QuotePage />
          <CommentPage />
         
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