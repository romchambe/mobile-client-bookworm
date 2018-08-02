import React from 'react';
import { colors, padding } from '../assets/styles/base'
import CameraIcon from './icons/CameraIcon'

import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'native-base';



class ScanTaker extends React.Component {

  render () {
    const styles = StyleSheet.create( {
      scanTaker: {
        height:60,
        width:60,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center', 
        borderRadius: 30,
        borderColor: colors.deepBlue, 
        borderWidth:2
      }, 
      buttonContainer: {
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
        paddingVertical: padding.sm,
        marginHorizontal: padding.int,
        marginBottom: padding.sm, 
      },
      buttonOverflow: {
        backgroundColor: colors.lightBlue,
        height:64,
        width:64,
        borderRadius: 32,
        flexDirection:'row',
        alignSelf: 'flex-end', 
        justifyContent:'center',
        alignItems:'center', 
      }
    })


    return (
      <View style={styles.buttonContainer}>
        <View style={styles.buttonOverflow}>
          <TouchableOpacity style={styles.scanTaker} onPress={this.props.onPress}> 
            <CameraIcon color={colors.deepBlue}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}




export default ScanTaker