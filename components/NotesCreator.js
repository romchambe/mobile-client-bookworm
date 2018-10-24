import React from 'react';
import { colors, padding } from '../assets/styles/base'
import PlusIcon from './icons/PlusIcon'

import { View, Text, Button, StyleSheet } from 'react-native';




class NotesCreator extends React.Component {

  render () {
    const styles = StyleSheet.create({
      customCreator: {
        flex: 1, 
        backgroundColor: colors.lightBlue,
        height:50,
        borderRadius: 25,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:5, 
        paddingRight:padding.int,
      }, 
      customSmPadding: {
        flex:1,
        flexDirection: 'row',
        maxHeight:70,
        paddingVertical: padding.sm,
        marginHorizontal: padding.int,
        marginBottom: padding.sm
      },
      customText: {
        fontFamily:'cabin-bold'
      }
    })
    
    return (
      <View style={styles.customSmPadding}>
        <Button title={this.props.content} style={styles.customCreator} onPress={this.props.onPress}> 
          <PlusIcon color={colors.deepBlue}/>
        </Button>
      </View>
    )
  }
}





export default NotesCreator