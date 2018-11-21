import React from 'react';

import appearsFromRight from './appearsFromRight'

import * as base from './../../assets/styles/base';

import * as sessionActions from './../../core-modules/actions/sessionActions'

import { View, Text, Dimensions, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

class BookEditContainer extends React.Component {
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout(){
    this.props.actions.logout()
  }
 

  render () {
    const { width, height } = Dimensions.get('window')
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: base.padding.lg
      }
    })

   

    return (
      <View style={styles.container}>
        <MainButton 
          danger
          height={40}
          onPress={this.props.actions.logout} 
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
    actions: bindActionCreators(sessionActions, dispatch)
  }
}
export default appearsFromRight(connect(mapStateToProps, mapDispatchToProps)(BookEditContainer))