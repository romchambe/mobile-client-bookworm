import React from 'react';
import * as base from './../../assets/styles/base';
import InputLegend from './InputLegend'
import InputField from './InputField'
import PreviewText from './PreviewText'
import swipeableComponent from './../containers/swipeableComponent'

import { ScrollView, View, Text, StyleSheet } from 'react-native';


class TitlePage extends React.Component {
  
  render() {
    console.log(this.props.preview)

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

        {
          this.props.preview ?
          <PreviewText maxHeight={80} text={this.props.preview} /> : 
          null
        }  
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