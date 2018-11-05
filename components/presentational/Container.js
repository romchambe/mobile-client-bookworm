import React from 'react';
import * as base from './../../assets/styles/base';

import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';

export default class Container extends React.Component {
  render() {
    const { width, height } = Dimensions.get('window')
    const styles = StyleSheet.create({
      scroll: {
        height: height,
        width: width
      },
      container:{
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: base.padding.md,
      }      
    })

    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          {this.props.children}
        </View>
      </ScrollView>
    );
  }
}