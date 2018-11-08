import React from 'react';

import AssetLoader from './../AssetLoader'
import EmptyBooksList from './../presentational/EmptyBooksList'
import BooksList from './../presentational/BooksList'

import * as base from './../../assets/styles/base';

import * as noteActions from './../../core-modules/actions/noteActions'
import * as navigationActions from './../../core-modules/actions/navigationActions'

import { View, FlatList, Text, Animated, Dimensions, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

class BooksContainer extends React.Component {
  constructor(props){
    super(props)
  }

  offset = new Animated.Value(1)
  componentDidMount() {

    Animated.timing(this.offset, {
      toValue: 0,
      duration: 250,
    }).start()

    
  }

  async postCreateNote(e) {
    await this.props.actions.createNote({jwt: this.props.jwt}, 'mobile');
    this.props.actions.navigateToEdit();
  }

  setCurrentNote = (noteId) => {
    let note = this.props.notes.notesList.find((item) => {
      return item.id === noteId
    })
   
    this.props.actions.setCurrentNote(note);
    this.props.actions.navigateToEdit();
  }

  

  render () {

    const { width, height } = Dimensions.get('window')
    
    const styles = StyleSheet.create({
      container: {
        flex: 1
      }
    })

    if (this.props.notes.isFetchingNotes) {
      return (
        <AssetLoader />
      );
    } else { 
      if (this.props.notes.notesList.length > 0){
        return (
          <EmptyBooksList newBook={this.postCreateNote} />
        );
      } else {
        return (
          <Animated.View style={
            [styles.container,{
              transform: [{
                translateX: this.offset.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, width]
                })
              }] 
            }]
          }>
            <BooksList books={[
              {title: "L'insoutenable légèreté de l'être", author:"Jean Pierre Connard", quoteCount: 97, created_at: "2018-09-25T13:35:34.137Z"},
              {title: "L'insoupirant de l'âme", author:"Milan Kundera", quoteCount: 15, created_at: "2018-08-25T13:35:34.137Z"},
              {title: "Bibi et Bubu", author:"Milan Kundera", quoteCount: 1, created_at: "2018-08-25T13:35:34.137Z"},
              {title: "Bibi et Bertha", author:"Milan Kundera", quoteCount: 8, created_at: "2017-09-25T13:35:34.137Z"}
            ]}/>
          </Animated.View>
        );
      }
    }
  }
}

function mapStateToProps(state){
  return {
    jwt: state.session.jwt,
    notes: state.notes
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({},noteActions, navigationActions),dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BooksContainer)