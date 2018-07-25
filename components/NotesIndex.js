import React from 'react';

import createStyles from '../assets/styles/base'
import TagLine from './TagLine'
import NoteCreator from './NoteCreator'
import Scan from './Scan'
import NoteView from './NoteView'
import noteApi from '../redux-apis-bookworm/apiModule/noteApi'

import { View } from 'react-native';
import { Text } from 'native-base';
import {  Route, withRouter  } from 'react-router-native';
import { connect } from 'redux';


class NotesIndex extends React.Component {
  componentDidMount() {
    noteApi.getNodeIndex({user: this.props.user, jwt: this.props.jwt}, 'mobile')
  }
  render () {
    const styles = createStyles();
    return (
      <View >
        <TagLine content='Scan anything with your phone (maybe... a book!), extract the text and keep note of it!' />
        <NoteCreator />
        <Route path='/scan' component={Scan} />
        <Route path='/note/:id' component={NoteView} />
      </View> 
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.user.id, 
    jwt: state.session.jwt,
  }
}
export default connect(mapStateToProps)(NotesIndex)