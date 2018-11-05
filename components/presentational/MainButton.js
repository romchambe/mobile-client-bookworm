import React from 'react';
import * as base from './../../assets/styles/base';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class SideMenuLink extends React.Component {
  render() {
    const height = this.props.height
    const styles = StyleSheet.create({
      mainButton:{
        backgroundColor: base.colors.yellow,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: height / 2, 
        width: 200
      }, 
      buttonText:{

        textAlign: 'center',
        fontFamily: 'cabin-bold',
        color: base.colors.blue
      }
    })
    return (

      <TouchableOpacity onPress={this.props.onPress} style={styles.mainButton} >
        <Text style={styles.buttonText} numberOfLines={1}>{this.props.legend}</Text>
      </TouchableOpacity>
    );
  }
}