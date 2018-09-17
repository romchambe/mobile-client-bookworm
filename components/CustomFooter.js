import React from 'react';

import ListIcon from './icons/ListIcon'
import CameraIcon from './icons/CameraIcon'
import LogoutIcon from './icons/LogoutIcon'
import { colors, padding } from '../assets/styles/base'

import { View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { FooterTab, Text, Button } from 'native-base';

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
      <FooterTab>
        <Button vertical onPress={() => this.props.actions.navigateToNotes()}>
          <ListIcon color={colors.deepBlue} />
          <Text style={styles.text}>My notes</Text>
          
        </Button>
        <Button vertical onPress={() => this.props.actions.navigateToScan()}>
          <CameraIcon color={colors.deepBlue} size={20} /> 
          <Text style={styles.text}>Scan</Text>
        </Button>
        <Button vertical onPress={() => this.props.actions.logoutUser()}>
          <LogoutIcon color={colors.deepBlue} size={16} />
          <Text style={styles.text}>Logout</Text>
        </Button>
      </FooterTab>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({},sessionActions, navigationActions), dispatch)
  }
}


export default connect(null, mapDispatchToProps)(CustomFooter)