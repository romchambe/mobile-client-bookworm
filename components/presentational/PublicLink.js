import React from 'react';
import * as base from './../../assets/styles/base';
import { View, Text, StyleSheet } from 'react-native';

export default class PublicLink extends React.Component {
  render() {
    const styles = StyleSheet.create({
      container:{
        marginBottom: base.padding.md,
        flex: 1,
        maxHeight: 36,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }, 
      link:{
        flex: 1,
        paddingLeft: base.padding.sm,
        fontFamily: 'cabin',
        color: base.colors.black
      }
    })
    return (

      <View style={styles.container} >
        <Text style={styles.link}>{this.props.link}</Text>
      </View>
    );
  }
}