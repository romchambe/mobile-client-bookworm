import React from 'react';
import * as base from './../../assets/styles/base';

import { View, Text, StyleSheet } from 'react-native';

export default class Header extends React.Component {
  render() {
    const styles = StyleSheet.create({
      container:{
        flex: 1, 
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        minHeight: 76,
        maxHeight:76,
        paddingTop: 28,
        paddingHorizontal: base.padding.sm,
        paddingBottom: 8,
      },
      
    })
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    );
  }
}