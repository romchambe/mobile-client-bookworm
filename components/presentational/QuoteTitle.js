import React from 'react';
import * as base from './../../assets/styles/base';
import { View, Text, StyleSheet } from 'react-native';

export default class QuoteTitle extends React.Component {
  render() {
    const styles = StyleSheet.create({
      legend:{
        fontFamily: 'cabin-bold',
        fontSize: base.fonts.md,
        color:base.colors.black,
        marginBottom: base.padding.xs,
      }
    })
    return (
      <Text style={styles.legend}>{this.props.content}</Text>
    );
  }
}