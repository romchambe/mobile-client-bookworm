import React from 'react';
import { createStyles, colors, padding, fonts } from './../assets/styles/base.js';
import { View, StyleSheet } from 'react-native';
import { Text, Button, StyleProvider } from 'native-base';


class ToggleButton extends React.Component {

  render () {
    const styles = StyleSheet.create({
      activeButton: {
        flex:1,
        backgroundColor: colors.lightBlue,
        justifyContent:'center', 
        paddingHorizontal: 1,
        paddingVertical: 1
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
        textAlign:'center'
      }, 
      inactiveText:{
        color: colors.altGrey,
        fontSize: fonts.sm,
        textAlign:'center'
      }

    });


    return (
      <Button rounded style={this.props.active ? styles.activeButton : styles.inactiveButton} onPress={this.props.onPress}>
        <Text style={this.props.active ? styles.activeText : styles.inactiveText}>
          {this.props.content}
        </Text>
      </Button>
    )
  }
}


export default ToggleButton