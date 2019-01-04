import React from 'react';

import LoginHome from './../presentational/LoginHome'
import LoginForm from './../presentational/LoginForm'
import AssetLoader from './../AssetLoader'

import * as base from './../../assets/styles/base';
import * as sessionActions from './../../core-modules/actions/sessionActions'
import * as userActions from './../../core-modules/actions/userActions'
import * as flowActions from './../../core-modules/actions/flowActions'

import { Animated, Keyboard, Easing, View, StyleSheet, Dimensions } from 'react-native';
import appearsFromRight from './appearsFromRight'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

class AuthContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      form: '',
      stepOffset: new Animated.Value(0),
      login: {},
      registration: {}
    }

    this.goToStep = this.goToStep.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegistration = this.handleRegistration.bind(this)
    this.handleFbLogin = this.handleFbLogin.bind(this)
    this.postLogin = this.postLogin.bind(this)
    this.postRegistration = this.postRegistration.bind(this)
  }
  
  handleLogin(payload){
    this.setState(
      (prevState, props) => ({
        login: Object.assign({}, prevState.login, payload)
      })
    )
  }

  handleRegistration(payload){
    this.setState(
      (prevState, props) => ({
        registration: Object.assign({}, prevState.registration, payload)
      })
    )
  }

  handleFbLogin(){
    this.props.actions.fbLoginUser('mobile');
  }

  postLogin(){  
    this.props.actions.loginUser({ login: this.state.login }, 'mobile')
  }

  postRegistration(){
    this.props.actions.createUser({ registration:this.state.registration }, 'mobile')
  }

  goToStep(action,type){
    this.setState({
      form: type
    })
    Animated.timing(this.state.stepOffset, {
      toValue: this.props.flow.step + action,
      duration: 200
    }).start(
      () => this.props.actions.updateFlow({
        next: action, 
        title: type === 'login' ? 'Se connecter' : type === 'registration' ? 'Créer un compte' : null, 
        back: () => this.goToStep(-1) 
      })
    )
  } 

  componentDidMount(){
    this.props.actions.startFlow()
  }

  componentWillUnmount(){
    this.props.actions.cleanFlow()
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
          <LoginHome 
            goToStep={this.goToStep}
            handleFbLogin={this.handleFbLogin}
          />
          <LoginForm 
            form={this.state.form}
            goToStep={this.goToStep}
            handleForm={this.state.form === 'login' ? this.handleLogin : this.handleRegistration} 
            handleSubmit={this.state.form === 'login' ? this.postLogin : this.postRegistration}
          />
        </Animated.View>
      </Animated.View>
    )
  }
}

function mapStateToProps(state){
  return {
    flow: state.flow,
    fetching: state.fetching
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({}, sessionActions, userActions, flowActions),dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)