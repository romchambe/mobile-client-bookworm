import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator} from 'react-native';

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
        <ActivityIndicator color={colors.yellow} />
      </View>
    )
  }
}

export default AssetLoader