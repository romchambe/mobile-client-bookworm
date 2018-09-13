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
  }

  componentDidMount() {
    this.props.actions.readNotesIndex({id:this.props.user, jwt: this.props.jwt}, 'mobile')
  }

  async uploadScan(payload) {
    this.props.actions.postScan({jwt: this.props.jwt, user_id: this.props.user, file:  payload.base64}, 'mobile');
  }

  incrementStep() {
    this.props.actions.incrementStep()
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
          notesList={this.props.notes.notesList}
        />
        break;
      case 3:
        currentStep = <NoteUpdateScreen />
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
    user: state.user.user.id, 
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