import React from 'react';
import * as base from './../../assets/styles/base';
import { View, Text, StyleSheet } from 'react-native';

export default class Badge extends React.Component {
  render() {
    const styles = StyleSheet.create({
      badge:{

        height: 40,
        width: 40, 
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: base.colors.blue
      },
      initial:{
        fontFamily: 'cabin-bold',
        fontSize: 24,
        color:base.colors.yellow
      }
    })
    return (

      <View style={styles.badge}>
         <Text style={styles.initial} >{this.props.name.slice(0,1)}</Text>
        
      </View>
    );
  }
}