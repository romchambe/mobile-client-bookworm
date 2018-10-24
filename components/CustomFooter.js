import React from 'react';

import ListIcon from './icons/ListIcon'
import CameraIcon from './icons/CameraIcon'
import LogoutIcon from './icons/LogoutIcon'
import { colors, padding } from '../assets/styles/base'

import { View, StyleSheet, Platform, Button, Text} from 'react-native';
import { Link } from 'react-router-native';


import { connect } from 'react-redux';
import * as sessionActions from './../core-modules/actions/sessionActions';
import * as navigationActions from './../core-modules/actions/navigationActions';
import { bindActionCreators } from 'redux'; 


class CustomFooter extends React.Component {

  render () {
    const styles = StyleSheet.create({
      text: {
        fontFamily:'cabin-bold',
        color: colors.deepBlue, 
        fontSize: 12
      }
    })
    return (
      <View> 
        <Button title={Platform.OS === 'ios' ? 'My notes' : 'Notes'} onPress={() => this.props.actions.navigateToNotes()}>
          <ListIcon color={colors.deepBlue} />

          
        </Button>
        <Button title='Scan' onPress={() => this.props.actions.navigateToScan()}>
          <CameraIcon color={colors.deepBlue} size={20} /> 

        </Button>
        <Button title='Logout' onPress={() => this.props.actions.logoutUser()}>
          <LogoutIcon color={colors.deepBlue} size={16} />

        </Button>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({},sessionActions, navigationActions), dispatch)
  }
}


export default connect(null, mapDispatchToProps)(CustomFooter)