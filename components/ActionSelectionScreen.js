import React from 'react';
import { colors, padding } from '../assets/styles/base'
import NotesCreator from './NotesCreator'
import NoteAccessor from './NoteAccessor'
import UpArrowIcon from './icons/UpArrowIcon'

import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Button} from 'native-base';



class ActionSelectionScreen extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      notesDisplay: false
    }
    this.toggleNotesList = this.toggleNotesList.bind(this)

  }

  postCreateNoteWithScan(e) {

  }

  toggleNotesList(e) {
    this.setState((prevState, props) => ({
      notesDisplay: !prevState.notesDisplay
    }));
  }

  render () {

    const styles = StyleSheet.create({
      container: {
        flex:1,
        flexDirection:'column',
        marginTop: padding.md 
      },
      toggle:{
        height:50,
        width:50,
        borderRadius: 25,
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor: colors.lightBlue, 
        alignItems:'center', 
        alignSelf: 'flex-end',
        marginRight: padding.md
      }
    })

    let notesList = 
        <View>
          <TouchableOpacity style={styles.toggle}  onPress={this.toggleNotesList} >
            <UpArrowIcon color={colors.deepBlue} />
          </TouchableOpacity>
          <FlatList
            data={this.props.notesList}
            renderItem={({item}) => <NoteAccessor key={item.id} title={item.title} />}
          />
        </View>
    let actionSelectionButtons = 
      <View>
        <NotesCreator content='Create a new note' onPress={this.postCreateNoteWithScan} />
        <NotesCreator content='Add to an existing note' onPress={this.toggleNotesList} />
        
      </View>

    return (
      <View style={styles.container}>
        
        { this.state.notesDisplay ? notesList : actionSelectionButtons }
      </View>
    )
  }
}


export default ActionSelectionScreen