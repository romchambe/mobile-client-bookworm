import React from 'react';

import appearsFromRight from './appearsFromRight'
import MainButton from './../presentational/MainButton'
import QuoteTitle from './../presentational/QuoteTitle'
import Quote from './../presentational/Quote'
import Comment from './../presentational/Comment'

import * as base from './../../assets/styles/base';

import * as bookActions from './../../core-modules/actions/bookActions'
import * as flowActions from './../../core-modules/actions/flowActions'


import { View, Text, Dimensions, ScrollView, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

class BookEditContainer extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.actions.startFlow()
    this.props.actions.readBook({
      jwt: this.props.jwt, 
      id: this.props.match.params.id
    }, 'mobile')
  }
 
  componentWillUnmount(){
    this.props.actions.cleanFlow()
    this.props.actions.cleanCurrentBook()
  }

  render () {
    const { width, height } = Dimensions.get('window')
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: base.padding.lg,
        paddingHorizontal: base.padding.md
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
          <MainButton height={40} legend="Nouvelle Citation" onPress={this.newQuote}/>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state){
  return {
    jwt: state.session.jwt,
    book: state.books.currentBook
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({}, bookActions, flowActions), dispatch)
  }
}
export default appearsFromRight(connect(mapStateToProps, mapDispatchToProps)(BookEditContainer))