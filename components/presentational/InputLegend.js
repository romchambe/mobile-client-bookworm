import React from 'react';
import * as base from './../../assets/styles/base';
import { View, Text, StyleSheet } from 'react-native';

export default class InputLegend extends React.Component {
  render() {
    const styles = StyleSheet.create({
      legend:{

        fontFamily: 'cabin-medium-italic',
        fontSize: base.fonts.md,
        color:base.colors.black,
        marginBottom: this.props.noMargin ? 0 : base.padding.xs
      }
    })
    return (
      <Text style={styles.legend}>{this.props.legend}</Text>
    );
  }
}