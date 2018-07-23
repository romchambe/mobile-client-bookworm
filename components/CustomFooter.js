import React from 'react';
import { View } from 'react-native';
import { Link } from 'react-router-native';
import { FooterTab, Text, Button } from 'native-base';

import { connect } from 'react-redux';
import * as sessionActions from './../redux-apis-bookworm/actions/sessionActions';
import { bindActionCreators } from 'redux'; 


class CustomFooter extends React.Component {
  render () {
    return (
      <FooterTab>
        <Button>
          <Link to='/notes'>
            <Text>My notes</Text>
          </Link>
        </Button>
        <Button onPress={() => this.props.actions.logoutUser()}>
          <Text>Logout</Text>
        </Button>
      </FooterTab>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  }
}


export default connect(null, mapDispatchToProps)(CustomFooter)