import React from 'react';
import * as base from './../../assets/styles/base';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';

export default class PreviewText extends React.Component {
  render() {
    const styles = StyleSheet.create({
      container: {
        flex:1,
        maxHeight: this.props.maxHeight,
        overflow:'hidden'
      },
      text:{

        fontFamily: 'cabin',
        fontSize: 12,
        color:base.colors.black
      },
      bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 40,
      }
    })
    return (

      <View style={styles.container}>
         <Text style={styles.text}>
          {this.props.text}
         </Text>
         <LinearGradient style={styles.bottom} colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']} />
      </View>
    );
  }
}