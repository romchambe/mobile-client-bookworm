import React from 'react';

import AssetLoader from './../AssetLoader'
import EmptyBooksList from './../presentational/EmptyBooksList'
import BooksList from './../presentational/BooksList'
import appearsFromRight from './appearsFromRight'

import * as base from './../../assets/styles/base';

import * as bookActions from './../../core-modules/actions/bookActions'
import * as navigationActions from './../../core-modules/actions/navigationActions'

import { View, FlatList, Text, Animated, Dimensions, StyleSheet, Easing } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

class BooksContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      outOffset: new Animated.Value(0)
    }
    this.navigateToNew = this.navigateToNew.bind(this)
  }

  componentDidMount(){
    this.props.actions.readBooksIndex({jwt: this.props.jwt}, 'mobile')
  }

  navigateToNew(){
    Animated.timing(this.state.outOffset, {
      toValue: -1,
      duration: 100,
    }).start(() => this.props.actions.navigateToNew());
  }

  render () {
    const { width, height } = Dimensions.get('window')
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      }
    })

    let content = this.props.books.isFetchingBooks ? 
      <AssetLoader /> :
      this.props.books.booksList.length > 0 ? 
        <BooksList books={this.props.books.booksList} newBook={this.navigateToNew}/> :
        <EmptyBooksList newBook={this.navigateToNew} />

    return (
      <Animated.View style={
        [styles.container, {
          transform: [{
            translateX: this.state.outOffset.interpolate({
              inputRange: [-1, 0],
              outputRange: [- width, 0]
            })
          }] 
        }]
      }>
        {content}
      </Animated.View>
    )
  }
}

function mapStateToProps(state){
  return {
    jwt: state.session.jwt,
    books: state.books
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({}, bookActions, navigationActions),dispatch)
  }
}
export default appearsFromRight(connect(mapStateToProps, mapDispatchToProps)(BooksContainer))