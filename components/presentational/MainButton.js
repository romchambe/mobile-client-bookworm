import React from 'react';
import * as base from './../../assets/styles/base';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class mainButton extends React.Component {
  render() {
    const height = this.props.height
    const styles = StyleSheet.create({
      mainButton:{
        backgroundColor: this.props.inverted ? 'transparent' : base.colors.yellow,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: height / 2, 
        width: 200,
        paddingHorizontal: height / 2,
        borderWidth: this.props.inverted ? 1 : 0,
        borderColor: this.props.inverted ? base.colors.yellow : 'transparent'
      }, 
      buttonText:{
        textAlign: 'center',
        fontFamily: this.props.inverted ? 'cabin-semi-bold' : 'cabin-bold',
        color: base.colors.blue, 

        minWidth:160
      }
    })
    return (
      <TouchableOpacity {...this.props} style={styles.mainButton} >
        <Text style={styles.buttonText} numberOfLines={1}>{this.props.legend}</Text>
      </TouchableOpacity>
    );
  }
}