import React from 'react';
import CustomIcon from './CustomIcon'

import * as base from './../../assets/styles/base';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BoxShadow } from 'react-native-shadow'

export default class SearchInput extends React.Component {
  render() {
    const width =  Dimensions.get('window').width
    
    const styles = StyleSheet.create({
      container:{
        flex: 1,
        alignItems:'center',
      },

      search:{
        height: 40,
        width: 0.86 * width,
        paddingHorizontal: base.padding.lg,
        alignItems:'center',
        borderRadius: 4,
        backgroundColor: 'white',
        fontFamily: 'cabin',
        color: base.colors.blue
      },
      icon: {
        position: 'absolute',
        left:12,
        top: 10,
        zIndex: 2,
        color: base.colors.blueMedium
      }      
    });

    const shadowOpt = {
      width:0.86 * width,
      height:40,
      color:this.props.shadowColor,
      border:3,
      radius:4,
      opacity:this.props.opacity,
      x:0,
      y:2,
      style: {position: 'relative'}
    }


    return (
      <View style={styles.container} >
        <BoxShadow setting={shadowOpt} >
          <MaterialCommunityIcons name="magnify" size={ 20 } style={styles.icon} />
          <TextInput 
            onChangeText={this.props.onChangeText}
            placeholder={this.props.placeholder}
            placeholderTextColor={base.colors.blueMedium}
            underlineColorAndroid="transparent"
            style={styles.search}
          />
        </BoxShadow>
      </View>
    );
  }
}