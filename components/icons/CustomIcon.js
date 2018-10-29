import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';

import { colors, padding } from './../../assets/styles/base';

export default class CustomIcon extends React.Component {
  render() {
    const dimension = this.props.dimension || 36

    const icons = {
      keyboardArrowLeft: {
        type: 'Material',
        size: 28,
        styles:{ 
          color: colors.blue, 
          paddingLeft: 0,
          paddingTop: 2,
          
        }
      },
      close: {
        type: 'Material',
        size: 24,
        styles: { 
          color: colors.blue, 
          paddingTop:1,
          paddingLeft:1
        }
      },
      menu: {
        type: 'Material',
        size: 22,
        styles: {
          color: colors.blue, 
          paddingLeft: 1,
          paddingTop: 1, 
        }
      },
      scan:{
        type: 'svg',
        size: 18,
        path: "M11.875,10 L28.125,10 C29.1605339,10 30,10.8394661 30,11.875 L30,28.125 C30,29.1605339 29.1605339,30 28.125,30 L11.875,30 C10.8394661,30 10,29.1605339 10,28.125 L10,11.875 C10,10.8394661 10.8394661,10 11.875,10 Z M11.6428571,11 C11.2878169,11 11,11.2878169 11,11.6428571 L11,28.3571429 C11,28.712183 11.2878169,29 11.6428571,29 L28.3571429,29 C28.712183,29 29,28.712183 29,28.3571429 L29,11.6428571 C29,11.2878169 28.712183,11 28.3571429,11 L11.6428571,11 Z M13,26.4 L13,24.3 C13,24.1343146 13.1343146,24 13.3,24 C13.4656854,24 13.6,24.1343146 13.6,24.3 L13.6,26.25 C13.6,26.3328427 13.6671573,26.4 13.75,26.4 L15.7,26.4 C15.8656854,26.4 16,26.5343146 16,26.7 C16,26.8656854 15.8656854,27 15.7,27 L13.6,27 C13.2686291,27 13,26.7313708 13,26.4 Z M26.4,27 L24.3,27 C24.1343146,27 24,26.8656854 24,26.7 C24,26.5343146 24.1343146,26.4 24.3,26.4 L26.25,26.4 C26.3328427,26.4 26.4,26.3328427 26.4,26.25 L26.4,24.3 C26.4,24.1343146 26.5343146,24 26.7,24 C26.8656854,24 27,24.1343146 27,24.3 L27,26.4 C27,26.7313708 26.7313708,27 26.4,27 Z M27,13.6 L27,15.7 C27,15.8656854 26.8656854,16 26.7,16 C26.5343146,16 26.4,15.8656854 26.4,15.7 L26.4,13.75 C26.4,13.6671573 26.3328427,13.6 26.25,13.6 L24.3,13.6 C24.1343146,13.6 24,13.4656854 24,13.3 C24,13.1343146 24.1343146,13 24.3,13 L26.4,13 C26.7313708,13 27,13.2686291 27,13.6 Z M13.6,13 L15.7,13 C15.8656854,13 16,13.1343146 16,13.3 C16,13.4656854 15.8656854,13.6 15.7,13.6 L13.75,13.6 C13.6671573,13.6 13.6,13.6671573 13.6,13.75 L13.6,15.7 C13.6,15.8656854 13.4656854,16 13.3,16 C13.1343146,16 13,15.8656854 13,15.7 L13,13.6 C13,13.2686291 13.2686291,13 13.6,13 Z"
      }
    }

    const processedIcon = (name) => {
      switch(name){
        case 'close':
          return <MaterialIcons name={this.props.name} size={ icons.close.size } style={icons.close.styles} /> ;
        case 'keyboard-arrow-left':
          return <MaterialIcons name={this.props.name} size={ icons.keyboardArrowLeft.size } style={icons.keyboardArrowLeft.styles} /> ;
        case 'menu':
          return <MaterialIcons name={this.props.name} size={ icons.menu.size } style={icons.menu.styles} /> ;
        case 'scan':
          return (
            <Svg height={icons.scan.size} width={icons.scan.size} fill={colors.blue} viewBox="0 0 20 20">
              <G transform="translate(-10.000000, -10.000000)">
                <Path d={icons.scan.path} fill={colors.blue} />
              </G>
            </Svg>
          )
        default:
          return {}
      }
    }

    const styles = StyleSheet.create({
      rounded: {
        height: dimension, 
        width: dimension,
        minWidth: dimension,
        borderRadius: dimension / 2,
        backgroundColor: colors.yellow,
      },
      normal:{
        backgroundColor: 'white',
      },
      
      centered:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
      }
    })


    return (
      <TouchableOpacity style={this.props.rounded ? styles.rounded : styles.normal} onPress={this.props.onPress}>
        <View style={styles.centered}>
          {
            processedIcon(this.props.name)
          }
          
        </View>
      </TouchableOpacity>
    );
  }
}