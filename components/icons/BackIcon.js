import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, padding } from './../assets/styles/base';

export default class CustomMaterial extends React.Component {
  render() {
    const dimension = this.props.dimension || 32
    const styles = StyleSheet.create({
      rounded: {
        height: dimension, 
        width: dimension,
        borderRadius: dimension / 2,
        backgroundColor: colors.yellow,
        padding: 6,
        color: colors.blue
      },
      normal:{
        color: colors.blue
      }
    })
    return (
      <MaterialIcons name={this.props.name} size={20} style={this.props.rounded ? styles.rounded : styles.normal} />
    );
  }
}