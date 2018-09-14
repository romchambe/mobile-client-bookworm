import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spinner, Text } from 'native-base';
import { colors } from './../assets/styles/base.js';


class PictureLoader extends React.Component {
  
  
  render () {
    const stylesheet = StyleSheet.create({
      centered: {
        flex:1,
        flexDirection: 'column', 
        justifyContent: 'center',
        backgroundColor: colors.deepBlue
      },
      text: {
        textAlign: 'center', 
        fontFamily: 'cabin-bold'
      }
    }) 
    return (      
      <View style={stylesheet.centered}>
        <Text style={stylesheet.text}> Bookworming it out... </Text>
        <Spinner color={colors.yellow} />
      </View>
    )
  }
}

export default PictureLoader