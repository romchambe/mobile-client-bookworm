import React from 'react';
import * as base from './../../assets/styles/base';
import InputLegend from './InputLegend'
import InputField from './InputField'
import MainButton from './MainButton'
import Quote from './Quote'
import QuoteTitle from './QuoteTitle'
import Comment from './Comment'


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

    const quotes = !!this.props.book ? this.props.book.quotes.map(quote => {
      return (
        <View key={quote.quote.id} style={styles.quoteContainer}>
          <QuoteTitle content={quote.quote.title} />
          <Quote content={quote.quote.content} />
          {
            quote.comments.map(comment => {
              return <Comment key={comment.id} content={comment.content} />
            }
          )}
        </View>
      )
    }) : null

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {quotes}
        </ScrollView>
        <View style={styles.bottomActions}>
          
        </View>
      </View>
    )
  }
}
