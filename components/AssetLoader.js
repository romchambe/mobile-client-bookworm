import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spinner } from 'native-base';
import { colors } from './../assets/styles/base.js';


class AssetLoader extends React.Component {
  
  
  render () {
    const stylesheet = StyleSheet.create({
      centered: {
        flex:1,
        flexDirection: 'column', 
        justifyContent: 'center',
        backgroundColor: colors.deepBlue
      }
    }) 
    return (      
      <View style={stylesheet.centered}>
        <Spinner color={colors.yellow} />
      </View>
    )
  }
}

export default AssetLoader