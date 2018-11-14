import React from 'react';


import * as base from './../../assets/styles/base';
import { View, Text, StyleSheet, Dimensions } from 'react-native';


export default class ListSeparator extends React.Component {
  render() {
    
    const styles = StyleSheet.create({
      container:{
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal: - base.padding.md,
        maxHeight:20,
        backgroundColor: base.colors.blueLight
      },
     
      text:{
        color: 'white',
        marginHorizontal: base.padding.md,
        fontFamily:'cabin-bold',
        fontSize: base.fonts.sm,
      }
    });

  

    return (
      <View style={styles.container}>
        <Text style={styles.text}> 
          {this.props.text}
        </Text>
      </View>
    );
  }
}