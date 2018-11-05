import React from 'react';

import AssetLoader from './../AssetLoader'
import EmptyBooksList from './../presentational/EmptyBooksList'
import BooksList from './../presentational/BooksList'

import * as base from './../../assets/styles/base';

import * as noteActions from './../../core-modules/actions/noteActions'
import * as navigationActions from './../../core-modules/actions/navigationActions'

import { View, FlatList, Text } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

class BooksContainer extends React.Component {
  constructor(props){
    super(props)
    this.postCreateNote = this.postCreateNote.bind(this)
  }

  componentDidMount() {
    this.props.actions.readNotesIndex({jwt: this.props.jwt}, 'mobile')
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
          <BooksList books={
            {title: "L'insoutenable légèreté de l'être", author:"Milan Kundera", quoteCount: 7, created: "2018-09-25T13:35:34.137Z"},
            {title: "L'insoupirant de l'âme", author:"Milan Kundera", quoteCount: 7, created: "2018-08-25T13:35:34.137Z"},
            {title: "Bibi et Bubu", author:"Milan Kundera", quoteCount: 7, created: "2018-08-25T13:35:34.137Z"}}/>
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