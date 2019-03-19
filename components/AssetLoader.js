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

      }
    }) 
    return (      
      <View style={stylesheet.centered}>
        <ActivityIndicator color={colors.blue} />
      </View>
    )
  }
}

export default AssetLoader