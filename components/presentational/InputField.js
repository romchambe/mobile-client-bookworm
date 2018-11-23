import React from 'react';
import * as base from './../../assets/styles/base';
import { View, TextInput, StyleSheet, Platform } from 'react-native';

export default class InputField extends React.Component {
  constructor(props){
    super(props)
    this.handleHeightChange = this.handleHeightChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleHeightChange(e){
    if (this.props.handleHeightChange)  {
      return this.props.handleHeightChange(e)
    }
  }

  handleChange(event){
    const { text } = event.nativeEvent
    this.props.handleChange({[this.props.name]: text})
  }

  render() {
    const styles = StyleSheet.create({
      input:{
        borderLeftWidth: 3,
        borderLeftColor: base.colors.yellow,
        fontFamily: 'cabin-bold',
        fontSize: 14,
        color:base.colors.blue,
        paddingLeft: base.padding.sm,
        marginVertical: base.padding.sm,
        maxHeight: this.props.maximumHeight 
      }
    })

    return (
      <TextInput 
        {...this.props}
        placeholderTextColor={base.colors.blueLight}
        underlineColorAndroid="transparent"
        multiline={ this.props.secureTextEntry ? false : true }        
        autoGrow={ Platform.OS === 'ios' ? false : true }
        onContentSizeChange={ this.handleHeightChange }
        onChange={this.handleChange}
        style={styles.input}
      />
        

        
    );
  }
}