import React from 'react';
import * as base from './../../assets/styles/base';
import InputLegend from './InputLegend'
import InputField from './InputField'
import MainButton from './MainButton'



import {  ScrollView, View, Text, StyleSheet, Animated } from 'react-native';

export default class BookFormPage extends React.Component {
  constructor(props){
    super(props) 
  }

  render() {
    const styles = StyleSheet.create({
      container:{
        flex:1,
        justifyContent: 'flex-start',
      },
      margin:{
        marginBottom: base.padding.md 
      },
      contentContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: base.padding.md
      },
      quoteContainer:{
        justifyContent: 'flex-start',
      },
      bottomActions:{
        position:'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 72,
        alignItems: 'center',
        paddingTop: base.padding.xs,
        paddingBottom: base.padding.md
      }
    })

    const form = this.props.form === 'edit' ? (
      <View style={styles.container}>
        <View style={styles.margin} />
        <InputLegend legend='Titre de la citation' />  
        <InputField 
          placeholder='Il vous permet de repérer plus vite votre citation' 
          name='title' 
          handleChange={this.props.handleBook} 
        />
        <View style={styles.margin} />
        <InputLegend legend="Contenu" />
        <InputField 
          placeholder="Votre citation" 
          name='content' 
          handleChange={this.props.handleBook}
        />
      </View>
    ) : null
    
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {form}
          <Text>{JSON.stringify(this.props.payload)}</Text>
        </ScrollView>
        <View style={styles.bottomActions}>
          <MainButton height={40} legend="Sauvegarder" />
        </View>
      </View>
    )
  }
}
