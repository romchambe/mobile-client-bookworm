import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { FooterTab, Text, Button } from 'native-base';

import { connect } from 'react-redux';
import * as sessionActions from './../redux-apis-bookworm/actions/sessionActions';
import { bindActionCreators } from 'redux'; 


class CustomFooter extends React.Component {

  render () {
    const styles = StyleSheet.create({
      text: {
        fontFamily:'cabin-bold'
      }
    })
    return (
      <FooterTab>
        <Button>
          <Link to='/notes'>
            <Text style={styles.text}>My notes</Text>
          </Link>
        </Button>
        <Button>
          <Link to='/scan'>
            <Text style={styles.text}>Scan</Text>
          </Link>
        </Button>
        <Button onPress={() => this.props.actions.logoutUser()}>
          <Text style={styles.text}>Logout</Text>
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