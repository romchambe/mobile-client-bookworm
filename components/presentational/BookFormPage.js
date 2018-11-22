import React from 'react';
import * as base from './../../assets/styles/base';
import InputLegend from './InputLegend'
import InputField from './InputField'
import MainButton from './MainButton'



import {  ScrollView, View, Text, StyleSheet, Animated } from 'react-native';

export default class BookFormPage extends React.Component {
  constructor(props){
    super(props)
    this.goToRegistration = this.goToRegistration.bind(this)
    this.goToLogin = this.goToLogin.bind(this)
  }

  goToLogin(){ 
    this.props.goToStep(1, 'login')
  }

  goToRegistration(){
    this.props.goToStep(1, 'registration')
  }

  render() {
    const styles = StyleSheet.create({
      container:{
        flex:1,
        justifyContent: 'flex-start',
        paddingHorizontal: base.padding.md,
      },
      contentContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start'
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

    
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text> Coucou </Text>
        </ScrollView>
        <View style={styles.bottomActions}>
          <MainButton height={40} legend="Sauvegarder" />
        </View>
      </View>
    )
  }
}
