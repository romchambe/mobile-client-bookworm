import React from 'react';
import * as base from './../../assets/styles/base';
import InputLegend from './../presentational/InputLegend'
import InputField from './../presentational/InputField'

import { View, Text, StyleSheet } from 'react-native';


export default class CommentPage extends React.Component {
  render() {
    const styles = StyleSheet.create({
      container:{
        flex:1,        
        justifyContent: 'flex-start',
        paddingHorizontal: base.padding.md
      }
    })
    return (
      <View style={styles.container}>
        <InputLegend noMargin legend='Cette citation vous inspire une pensée particulière?' />
        <InputLegend legend=' Ajoutez un commentaire si vous le souhaitez!' />
        <InputField placeholder='Titre du livre' />
    

      </View>
    );
  }
}