import React from 'react';
import { colors, padding } from '../assets/styles/base'

import { TextInput, StyleSheet } from 'react-native';


class CustomTextArea extends React.Component {

  render () {
    const styles = StyleSheet.create({
      textArea: {
        flex: 1, 
        backgroundColor: colors.deepblue,
        borderRadius:6,
        borderColor: colors.yellow, 
        borderWidth: 2,
        alignItems:'center',
        color: colors.yellow,
        fontFamily: 'cabin-bold', 
        marginTop: padding.int, 
        marginHorizontal: padding.int,
      }
    })
    return (
      <Textarea 
        multiline={true}
        numberOfLines={this.props.rowSpan} 
        placeholder={this.props.placeholder} 
        placeholderTextColor={colors.lightYellow} 
        onChangeText={this.props.onChangeText}
        style={styles.textArea} 
        value={this.props.value}
      />
    )
  }
}




export default CustomTextArea