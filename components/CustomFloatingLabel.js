import React from 'react';
import { colors, padding } from '../assets/styles/base'

import { TextInput, StyleSheet } from 'react-native';


class CustomFloatingLabel extends React.Component {
  render () {
    const styles = StyleSheet.create({
      input: {
        marginVertical: padding.int,
        marginHorizontal: 25,
        paddingBottom: 4,
        fontFamily: 'cabin-bold', 
        borderBottomWidth: 2, 
        borderBottomColor: colors.yellow,
        fontSize: 15,
        color: colors.yellow
      }
    });



    return (
        <TextInput
          style={styles.input} 
          onChangeText={this.props.onChangeText} 
          value={this.props.value}
          secureTextEntry={ this.props.secureTextEntry ? true : false }
          editable={this.props.disabled ? false : true}
          placeholder={this.props.label}
          placeholderTextColor={colors.altGrey}
 
        />
    )
  }
}



export default CustomFloatingLabel