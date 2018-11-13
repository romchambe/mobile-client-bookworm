import React from 'react';

import AssetLoader from './../AssetLoader'
import EmptyBooksList from './../presentational/EmptyBooksList'
import BooksList from './../presentational/BooksList'

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
      offset: new Animated.Value(1)
    }
    this.navigateToNew = this.navigateToNew.bind(this)
  }

  componentDidMount() {
    Animated.timing(this.state.offset, {
      toValue: 0,
      duration: 200
    }).start()
  }

  navigateToNew(){
    Animated.timing(this.state.offset, {
      toValue: -1,
      duration: 100,
    }).start(() => this.props.actions.navigateToNew());
  }

  setCurrentBook = (bookId) => {
    let book = this.props.books.booksList.find((item) => {
      return item.id === bookId
    })
    this.props.actions.setCurrentBook(book);
    this.props.actions.navigateToEdit();
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
        
        <EmptyBooksList newBook={this.navigateToNew} /> :
        <BooksList books={this.props.books.booksList} newBook={this.navigateToNew}/> 

      
      

    return (
      <Animated.View style={
        [styles.container, {
          transform: [{
            translateX: this.state.offset.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: [- width, 0, width]
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
export default connect(mapStateToProps, mapDispatchToProps)(BooksContainer)