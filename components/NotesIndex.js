import React from 'react';

import NoteCreator from './NotesCreator'
import NoteAccessor from './NoteAccessor'
import NoteView from './NoteView'
import SectionTitle from './SectionTitle'
import CustomTextArea from './CustomTextArea'
import CustomFloatingLabel from './CustomFloatingLabel'
import * as noteActions from '../redux-apis-bookworm/actions/noteActions'

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

  postCreateNote(e) {
    this.props.actions.createNote({jwt: this.props.jwt}, 'mobile')
  }

  render () {
    return (
      <View style={{marginTop: 40}}>
        <NoteCreator onPress={this.postCreateNote} content='Create a new note' />
        <SectionTitle content='All your notes:' />
        <View>
          <FlatList
            data={this.props.notes.notesList}
            renderItem={({item}) => <NoteAccessor key={item.id} title={item.title} />}
          />
        </View>
      </View> 
    )
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
    actions: bindActionCreators(noteActions,dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NotesIndex)