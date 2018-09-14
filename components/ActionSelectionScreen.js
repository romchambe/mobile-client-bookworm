import React from 'react';
import { colors, padding } from '../assets/styles/base'
import NotesCreator from './NotesCreator'
import NoteAccessor from './NoteAccessor'
import UpArrowIcon from './icons/UpArrowIcon'
import CustomTextArea from './CustomTextArea'
import SectionTitle from './SectionTitle'

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

  toggleNotesList(e) {
    console.log('toggle clicked')
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
      backToOptionsBar:{
        flex: 1, 
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: padding.lg,
        marginBottom: padding.int,
        maxHeight: 50,
      },
      toggle:{
        height:50,
        width:50,
        borderRadius: 25,
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor: colors.lightBlue, 
        alignItems:'center', 
        marginRight: padding.int 
      },
      backText: {
        color: colors.lightBlue,
        fontFamily: 'cabin-bold'
      }, 
      list: {
        maxHeight: 200, 
        marginBottom: padding.int
      }
    })

    let notesList = 
        <View>
          <View style={styles.backToOptionsBar}> 
            <Text style={styles.backText} >Back to options </Text>
            <TouchableOpacity style={styles.toggle}  onPress={this.toggleNotesList} >
              
              <UpArrowIcon color={colors.deepBlue} />
            </TouchableOpacity>
          </View>
          <FlatList
            style={styles.list}
            data={this.props.notesList}
            renderItem={({item}) => <NoteAccessor key={item.key} title={item.title} onPress={() => this.props.addScanToNote(item.id)} />}
          />
        </View>
    let actionSelectionButtons = 
      <View>
        <NotesCreator content='Create a new note' onPress={this.props.postCreateNote} />
        <NotesCreator content='Add to an existing note' onPress={this.toggleNotesList} />
      </View>

    return (
      <View style={styles.container}>
        { this.state.notesDisplay ? notesList : actionSelectionButtons }
        <SectionTitle content='Preview of the scan' />
        <CustomTextArea rowSpan={9} value={this.props.response} disabled={true}/>
      </View>
    )
  }
}


export default ActionSelectionScreen