import React from 'react';

import appearsFromRight from './appearsFromRight'

import * as base from './../../assets/styles/base';

import * as sessionActions from './../../core-modules/actions/sessionActions'
import * as flowActions from './../../core-modules/actions/flowActions'

import MainButton from './../presentational/MainButton'

import { View, Text, Dimensions, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

class ProfileContainer extends React.Component {
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this)
  }

  componentDidMount(){
    this.props.actions.cleanFlow()
  }

  logout(){
    this.props.actions.logout()
  }
 

  render () {
    const { width, height } = Dimensions.get('window')
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,

        alignItems:'center', 
        justifyContent: 'center'
      }
    })

   

    return (
      <View style={styles.container}>
        <MainButton 
          danger
          legend="Se déconnecter"
          height={40}
          onPress={this.props.actions.logoutUser} 
        />
      </View>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({}, sessionActions, flowActions), dispatch)
  }
}
export default appearsFromRight(connect(mapStateToProps, mapDispatchToProps)(ProfileContainer))