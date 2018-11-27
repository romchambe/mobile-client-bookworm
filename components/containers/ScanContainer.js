import React from 'react';

import AssetLoader from './../AssetLoader'
import ScanPage from './../presentational/ScanPage'
import ResizePage from './../presentational/ResizePage'
import FinalPage from './../presentational/FinalPage'

import * as base from './../../assets/styles/base';
import * as scanActions from './../../core-modules/actions/scanActions'
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
    this.goToStep = this.goToStep.bind(this)
    this.handlePicture = this.handlePicture.bind(this)
    this.navigateToBookFinal = this.navigateToBookFinal.bind(this)
  }

  componentDidMount(){
    this.props.actions.startFlow()
    if (!!this.props.flow.from){
      this.setState({
        payload: this.props.flow.payload
      })
    }
  }

  componentWillUnmount(){
    this.props.actions.transmitData({
      from: 'scan', 
      payload: this.props.flow.payload
    })
  }

  steps = ['Scan', 'Ajout de la citation']

  async handlePicture(payload){
    await this.props.actions.postScan({jwt: this.props.jwt, file:  payload.base64}, 'mobile');

    if (!!this.props.flow.from){
      if (this.props.flow.from === 'new'){
        this.props.actions.navigateToNew()
      } else if (this.props.flow.from === 'edit'){
        this.props.actions.navigateToEdit(this.props.flow.payload.id)
      }
    } else {
      this.goToStep(1)
    }
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

  navigateToBookFinal(payload){
    this.props.actions.navigateToEdit(payload)
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
        width: 2 * width,
        height: height - 72,
        flexDirection: 'row'
      }, 
    })
    return this.props.fetching ? <AssetLoader /> : (
      
      <Animated.View style={[
        styles.pageView, {
          left: this.state.stepOffset.interpolate({
            inputRange: [0, 2],
            outputRange: [0, - 2 * width]
          }),
        }
      ]}>

        <ScanPage handlePicture={this.handlePicture} />
        <FinalPage 
          books={this.props.books.booksList} 
          extracted={this.props.flow.payload}
          goToBook={this.navigateToBookFinal}
          goToNew={this.props.actions.navigateToNew}
        />
      </Animated.View>
    )
  }
}

//<ResizePage nextStep={() => this.goToStep(1)} />

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
    actions: bindActionCreators(Object.assign({}, bookActions, navigationActions, scanActions, flowActions), dispatch)
  }
}
export default appearsFromRight(connect(mapStateToProps, mapDispatchToProps)(ScanContainer))