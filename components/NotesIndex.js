import React from 'react';

import TagLine from './TagLine'
import NoteCreator from './NoteCreator'
import NoteAccessor from './NoteAccessor'
import NoteView from './NoteView'
import SectionTitle from './SectionTitle'
import * as noteActions from '../redux-apis-bookworm/actions/noteActions'

import { View, FlatList } from 'react-native';
import { Text } from 'native-base';
import { Route, withRouter  } from 'react-router-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

class NotesIndex extends React.Component {
  constructor(props){
    super(props)
    this.postCreateNote = this.postCreateNote.bind(this)
  }

  componentDidMount() {
    this.props.actions.readNotesIndex({id:this.props.user ,jwt: this.props.jwt}, 'mobile')
  }

  postCreateNote(e) {
    this.props.actions.createNote({id:this.props.user ,jwt: this.props.jwt}, 'mobile')
  }

  render () {
    return (
      <View>
        <TagLine content='Scan anything with your phone (maybe... a book!), extract the text and keep note of it!' />
        <NoteCreator onPress={this.postCreateNote}/>
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
    user: state.user.id, 
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