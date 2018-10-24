import React from 'react';
import { createStyles, colors, padding, fonts } from './../assets/styles/base.js';
import { View, StyleSheet, Platform, Text, Button } from 'react-native';



class ToggleButton extends React.Component {

  render () {
    const styles = StyleSheet.create({
      activeButton: {
        flex:1,
        backgroundColor: colors.lightBlue,
        justifyContent:'center', 
        paddingHorizontal: 1,
        paddingVertical: 1,
      },
      inactiveButton: {
        flex:1,
        backgroundColor: 'transparent', 
        justifyContent:'center',
        paddingHorizontal: 1,
        paddingVertical: 1,
      },
      activeText:{
        color: colors.deepBlue, 
        fontSize: fonts.sm, 
        textAlign:'center', 
        fontFamily: 'cabin-bold'
      }, 
      inactiveText:{
        color: colors.altGrey,
        fontSize: fonts.sm,
        textAlign:'center', 
        fontFamily: 'cabin-bold'
      }

    });


    return (
      <Button 
        rounded 
        title={this.props.content}
        style={this.props.active ? styles.activeButton : styles.inactiveButton} 
        onPress={this.props.onPress} 
        transparent={!this.props.active && Platform.OS !== 'ios' ? true : false }
      />
    )
  }
}


export default ToggleButton