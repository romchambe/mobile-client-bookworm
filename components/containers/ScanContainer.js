import React from 'react';

import ScanPage from './../presentational/ScanPage'
import ResizePage from './../presentational/ResizePage'
import FinalPage from './../presentational/FinalPage'

import * as base from './../../assets/styles/base';
import * as bookActions from './../../core-modules/actions/bookActions'
import * as flowActions from './../../core-modules/actions/flowActions'
import * as navigationActions from './../../core-modules/actions/navigationActions'

import { View, FlatList, Text, Animated, Dimensions, StyleSheet, ScrollView, Keyboard, Easing } from 'react-native';
import appearsFromRight from './appearsFromRight'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

class ScanContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      stepOffset: new Animated.Value(0),
    }
    this.nextStep = this.nextStep.bind(this)
    this.goToStep = this.goToStep.bind(this)
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

  componentDidMount(){
    this.props.actions.startFlow()
  }

  componentWillUnmount(){
    this.props.actions.cleanFlow()
  }


  steps = ['Scan', 'Recadrer', 'Ajout de la citation']

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

  render () {
    const { width, height } = Dimensions.get('window')
  
    const styles = StyleSheet.create({
      container: {
        flex:1,
      },
      pageView: {
        position: 'absolute',
        top: 0,
        width: 3 * width,
        height: height - 72,
        flexDirection: 'row'
      }, 
    })
    return (  
      <Animated.View style={[
        styles.pageView, {
          left: this.state.stepOffset.interpolate({
            inputRange: [0, 2],
            outputRange: [0, - 2 * width]
          }),
        }
      ]}>

        <ScanPage nextStep={() => this.goToStep(1)} />
        <ResizePage nextStep={() => this.goToStep(1)} />
        <FinalPage />
      </Animated.View>
    )
  }
}

function mapStateToProps(state){
  return {
    jwt: state.session.jwt,
    books: state.books,
    flow: state.flow
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({}, bookActions, navigationActions, flowActions), dispatch)
  }
}
export default appearsFromRight(connect(mapStateToProps, mapDispatchToProps)(ScanContainer))