import React from 'react';

import ScanPage from './../presentational/ScanPage'
import ResizePage from './../presentational/ResizePage'
import FinalPage from './../presentational/FinalPage'

import * as base from './../../assets/styles/base';
import * as bookActions from './../../core-modules/actions/bookActions'
import * as navigationActions from './../../core-modules/actions/navigationActions'

import { View, FlatList, Text, Animated, Dimensions, StyleSheet, ScrollView, Keyboard, Easing } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

class ScanContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentStep: 0,
      stepOffset: new Animated.Value(0),
      offset: new Animated.Value(1),
    }
    this.nextStep = this.nextStep.bind(this)
  }

  componentDidMount() {    
  
    Animated.timing(this.state.offset, {
      toValue: 0,
      duration: 200,
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
          styles.pageView, {
            left: this.state.stepOffset.interpolate({
              inputRange: [0, 2],
              outputRange: [0, - 2 * width]
            }),
          }
        ]}>

          <ScanPage nextStep={this.nextStep} />
          <ResizePage nextStep={this.nextStep} />
          <FinalPage />
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
export default connect(mapStateToProps, mapDispatchToProps)(ScanContainer)