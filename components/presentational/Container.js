import React from 'react';
import * as base from './../../assets/styles/base';

import { View, Text, StyleSheet } from 'react-native';

export default class Container extends React.Component {
  render() {
    const styles = StyleSheet.create({
      container:{
        flex: 1,
        justifyContent: 'flex-start',
      }      
    })

    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    );
  }
}