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

        {
          this.props.extracted ?
          <PreviewText maxHeight={80} text={this.props.preview} /> : 
          null
        }  
        <View style={styles.margin} />
        <InputLegend legend='Quel est le titre du livre que vous lisez?' />  
        <InputField 
          placeholder='Titre du livre' 
          name='title' 
          handleChange={this.props.handleBook} 
          value={!!this.props.book.title ? this.props.book.title : null}
        />
        <View style={styles.margin} />
        <InputLegend legend="Qui en est l'auteur?" />
        <InputField 
          placeholder="Nom de l'auteur" 
          name='author' 
          handleChange={this.props.handleBook}
          value={!!this.props.book.author ? this.props.book.author : null}
        />
      </View>
    );
  }
}

export default swipeableComponent(TitlePage)