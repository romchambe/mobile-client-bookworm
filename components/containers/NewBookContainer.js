import React from 'react';


import * as base from './../../assets/styles/base';

import * as noteActions from './../../core-modules/actions/noteActions'
import * as navigationActions from './../../core-modules/actions/navigationActions'

import { View, FlatList, Text } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

class NewBookContainer extends React.Component {
  render () {
    return (
      <View>
        <Text>
          New Book
        </Text>
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
    actions: bindActionCreators(Object.assign({},noteActions, navigationActions),dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewBookContainer)