import React from 'react';

import LoginHome from './../presentational/LoginHome'
import LoginForm from './../presentational/LoginForm'

import * as base from './../../assets/styles/base';
import * as sessionActions from './../../core-modules/actions/sessionActions'

import { Animated, Keyboard, Easing, View, StyleSheet, Dimensions } from 'react-native';
import appearsFromRight from './appearsFromRight'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

class AuthContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentStep: 0,
      form: '',
      stepOffset: new Animated.Value(0),
      login: {},
      signup: {}
    }

    this.goToStep = this.goToStep.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
  }
  
  handleLogin(payload){
    this.setState(
      (prevState, props) => ({
        book: Object.assign({}, prevState.login, payload)
      })
    )
  }

  handleSignup(payload){
    this.setState(
      (prevState, props) => ({
        quote: Object.assign({}, prevState.signup, payload)
      })
    )
  }

  goToStep(step,type){
    Animated.timing(this.state.stepOffset, {
      toValue: step,
      duration: 200
    }).start(() => this.setState(
      (prevState, props) => ({
        currentStep: prevState.currentStep + action
      })
    ))
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
        width: 2 * width,
        paddingTop: base.padding.lg,
        flexDirection: 'row'
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
          <LoginHome goToStep={this.goToStep}/>
          <LoginForm 
            form={this.state.form}
            goToStep={this.goToStep}
            handleLogin={this.handleLogin} 
            handleSignup={this.handleSignup}
          />
        </Animated.View>
      </Animated.View>

    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(sessionActions,dispatch)
  }
}
export default connect(null, mapDispatchToProps)(AuthContainer)