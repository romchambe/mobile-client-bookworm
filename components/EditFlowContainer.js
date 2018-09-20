import React from 'react';

import ScanFlowProgress from './ScanFlowProgress'
import ScanScreen from './ScanScreen'
import ActionSelectionScreen from './ActionSelectionScreen'
import NoteUpdateScreen from './NoteUpdateScreen'
import PictureLoader from './PictureLoader'

import * as noteActions from '../core-modules/actions/noteActions'
import * as scanFlowActions from '../core-modules/actions/scanFlowActions'

import { FileSystem } from 'expo';
import { View } from 'react-native';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

class EditFlowContainer extends React.Component {
  constructor(props){
    super(props);

    this.uploadScan = this.uploadScan.bind(this);
    this.postCreateNote = this.postCreateNote.bind(this);
    this.addScanToNote = this.addScanToNote.bind(this);
  }

  componentWillUnmount() {
    this.props.actions.setCurrentNote(null); 
    this.props.actions.cleanScanFlow();
  }

  async uploadScan(payload) {
    await this.props.actions.postScan({jwt: this.props.jwt, file:  payload.base64}, 'mobile');
    let note = this.props.notes.currentNote
    note.content = note.content + '\n \n' + this.props.scanFlow.apiResponse.response

    this.props.actions.setCurrentNote(note)
    this.props.actions.incrementStep()
  }
  
  async postCreateNote(e) {
    await this.props.actions.createNote({jwt: this.props.jwt, content: this.props.scanFlow.apiResponse.response}, 'mobile')
    this.props.actions.incrementStep();
  }

  addScanToNote(e){
    this.props.actions.incrementStep();
  }
  
  putUpdateNote = (payload) => {
    this.props.actions.updateNote({
      jwt: this.props.jwt, 
      id: this.props.notes.currentNote.id,
      title: payload.title, 
      book:payload.book, 
      content: payload.content
    }, 'mobile')
  }

  render () {
    const content = ["Add some new stuff to your note", "Let's scan new stuff", "The extracted content has been added"];
    let currentStep;
    
    switch (this.props.scanFlow.step){
      case 1:
        currentStep = <NoteUpdateScreen 
          note={this.props.notes.currentNote} 
          scan={false}  
          addScanToNote={this.addScanToNote} 
          putUpdateNote={this.putUpdateNote} 
        />
        break;
      case 2: 
        currentStep = <ScanScreen uploadScan={this.uploadScan}/>;
        break;
      case 3:
        currentStep = <NoteUpdateScreen 
          note={this.props.notes.currentNote} 
          scan={true} 
          putUpdateNote={this.putUpdateNote} 
        />;
        break;
    }

    return (
      <View style={{ flex: 1 }}>
        <ScanFlowProgress content={content[this.props.scanFlow.step - 1]} step={this.props.scanFlow.step} />

        {this.props.scanFlow.isUploadingScan || this.props.notes.isFetchingNotes ? <PictureLoader /> : currentStep}
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
export default connect(mapStateToProps, mapDispatchToProps)(EditFlowContainer)