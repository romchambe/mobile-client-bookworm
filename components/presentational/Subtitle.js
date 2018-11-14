import React from 'react';
import * as base from './../../assets/styles/base';
import { View, Text, StyleSheet } from 'react-native';

export default class Subtitle extends React.Component {
  render() {
    const styles = StyleSheet.create({
      
      subtitle: {
        fontSize: base.fonts.sm,
        fontFamily: 'cabin',
        color: base.colors.blue,
      }
    })
    return (
      <Text style={styles.subtitle}  numberOfLines={1}>
        {this.props.children}
      </Text>
    );
  }
}