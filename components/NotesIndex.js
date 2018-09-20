import React from 'react';

import NoteCreator from './NotesCreator'
import NoteAccessor from './NoteAccessor'
import SectionTitle from './SectionTitle'
import AssetLoader from './AssetLoader'

import * as noteActions from '../core-modules/actions/noteActions'
import * as navigationActions from '../core-modules/actions/navigationActions'

import { View, FlatList } from 'react-native';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

class NotesIndex extends React.Component {
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
    } else  { 
      return (
        <View style={{marginTop: 40}}>
          <NoteCreator onPress={this.postCreateNote} content='Create a new note' />
          <SectionTitle content='All your notes:' />
          <View>
            <FlatList
              data={this.props.notes.notesList}
              renderItem={({item}) => <NoteAccessor key={item.key} title={item.title} onPress={() => this.setCurrentNote(item.id)} />}
            />
          </View>
        </View> 
      );
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
export default connect(mapStateToProps, mapDispatchToProps)(NotesIndex)