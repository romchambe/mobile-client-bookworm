import React from 'react';

import ScanFlowProgress from './ScanFlowProgress'
import ScanScreen from './ScanScreen'
import ActionSelectionScreen from './ActionSelectionScreen'
import NoteUpdateScreen from './NoteUpdateScreen'
import PictureLoader from './PictureLoader'

import * as noteActions from '../redux-apis-bookworm/actions/noteActions'
import * as scanFlowActions from '../redux-apis-bookworm/actions/scanFlowActions'

import { FileSystem } from 'expo';
import { View } from 'react-native';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

class ScanFlowContainer extends React.Component {
  constructor(props){
    super(props);

    this.uploadScan = this.uploadScan.bind(this);
    this.incrementStep = this.incrementStep.bind(this);
    this.postCreateNote = this.postCreateNote.bind(this);
  }

  componentDidMount() {
    this.props.actions.readNotesIndex({jwt: this.props.jwt}, 'mobile')
  }

  async uploadScan(payload) {
    this.props.actions.postScan({jwt: this.props.jwt, file:  payload.base64}, 'mobile');
  }

  incrementStep() {
    this.props.actions.incrementStep()
  }
  
  postCreateNote(e) {
    this.props.actions.createNote({jwt: this.props.jwt, content: this.props.scanFlow.apiResponse.response}, 'mobile')
    this.incrementStep();
  }

  addScanToNote = (noteId) => {
    let note = this.props.notes.notesList.find((item) => {
      return item.id === noteId
    })
    note.content = note.content + '\n \n' + this.props.scanFlow.apiResponse.response
    
    this.props.actions.setCurrentNote({note: note})
    this.incrementStep()
  }

  putUpdateNote = (payload) => {
    this.props.actions.updateNote({
      jwt: this.props.jwt, 
      id: this.props.notes.currentNote.id,
      title: payload.title, 
      book:payload.book, 
      content: payload.content
    })
  }

  render () {
    const content = ["Let's go, scan some text!", "What do we do with this scan?", "Edit and save your note!"];
    let currentStep;
    
    switch (this.props.scanFlow.step){
      case 1:
        currentStep = <ScanScreen uploadScan={this.uploadScan}/>;
        break;
      case 2: 
        currentStep = <ActionSelectionScreen 
          increment={this.incrementStep} 
          postCreateNote={this.postCreateNote}
          addScanToNote={this.addScanToNote}
          notesList={this.props.notes.notesList}
          response={this.props.scanFlow.apiResponse.response}
        />
        break;
      case 3:
        currentStep = <NoteUpdateScreen note={this.props.notes.currentNote} scan={true} putUpdateNote={this.putUpdateNote} />
    }

    return (
      <View style={{ flex: 1 }}>
        <ScanFlowProgress content={content[this.props.scanFlow.step - 1]} step={this.props.scanFlow.step} />

        {this.props.scanFlow.isUploadingScan ? <PictureLoader /> : currentStep}
      </View>
    )
  }
}

function mapStateToProps(state){
  return {
    jwt: state.session.jwt,
    notes: state.notes,
    scanFlow: state.scanFlow
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({},noteActions, scanFlowActions),dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ScanFlowContainer)