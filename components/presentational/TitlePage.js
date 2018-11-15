import React from 'react';
import * as base from './../../assets/styles/base';
import InputLegend from './InputLegend'
import InputField from './InputField'
import PreviewText from './PreviewText'
import swipeableComponent from './../containers/swipeableComponent'

import { ScrollView, View, Text, StyleSheet } from 'react-native';


class TitlePage extends React.Component {
  
  render() {

    const styles = StyleSheet.create({
      container:{
        flex:1,
        justifyContent: 'flex-start',
        paddingHorizontal: base.padding.md
      },
      margin:{
        marginBottom: base.padding.md 
      }
    })
    return (
      <View style={styles.container}>
        <PreviewText maxHeight={80} text='"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in.”' />
        <View style={styles.margin} />
        <InputLegend legend='Quel est le titre du livre que vous lisez?' />  
        <InputField placeholder='Titre du livre' name='title' handleChange={this.props.handleBook} />
        <View style={styles.margin} />
        <InputLegend legend="Qui en est l'auteur?" />
        <InputField placeholder="Nom de l'auteur" name='author' handleChange={this.props.handleBook}/>
      </View>
    );
  }
}

export default swipeableComponent(TitlePage)