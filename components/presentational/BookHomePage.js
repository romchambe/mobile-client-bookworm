import React from 'react';
import * as base from './../../assets/styles/base';
import CustomIcon from './CustomIcon'
import MainButton from './MainButton'
import Quote from './Quote'
import QuoteTitle from './QuoteTitle'
import Comment from './Comment'


import {  ScrollView, View, Text, StyleSheet, Animated } from 'react-native';

export default class BookHomePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      touchDisabled: true
    }
    this.activateTouch = this.activateTouch.bind(this)
    this.goToNew = this.goToNew.bind(this)
    this.goToEdit = this.goToEdit.bind(this)
  }

  activateTouch(){
    this.setState({
      touchDisabled: false
    })
  }

  goToNew(){ 
    this.props.goToStep(1, 'new')
  }

  goToEdit(){
    this.props.goToStep(1, 'edit')
  }

  render() {
    const styles = StyleSheet.create({
      container:{
        flex:1,
        justifyContent: 'flex-start',
      },
      contentContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start'
      },
      bottomActions:{
        position:'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 72,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: base.padding.xs,
        paddingBottom: base.padding.md
      }
    })

    const quotes = !!this.props.book ? this.props.book.quotes.map(quote => {
      return (
        <View key={quote.quote.id} > 
          <Quote 
            id={quote.quote.id} 
            title={quote.quote.title} 
            content={quote.quote.content} 
            disabled={this.state.touchDisabled}
          />
          {
            quote.comments.map(comment => {
              return <Comment 
                key={comment.id} 
                id={comment.id}
                content={comment.content} 
                disabled={this.state.touchDisabled}
              />
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
          <CustomIcon name="edit" rounded dimension={44} style={{marginRight:base.padding.xs}} onPress={this.activateTouch}/>
          <CustomIcon name="add" rounded dimension={44} style={{marginLeft:base.padding.xs}} onPress={this.goToNew}/> 
        </View>
      </View>
    )
  }
}
