import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { colors, padding } from './../assets/styles/base';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

class Header extends React.Component {
  render () {
    const styles = StyleSheet.create({
      container: {
        marginTop: 20,
        flex: 1, 
        flexDirection: 'row',
        marginHorizontal: 12,
        marginBottom: 8,
        justifyContent: "spaceBetween"
      },

    })

    
    return (
      <View style={styles.container}>
        <CustomMaterial />
        <Title />
        <ScanIcon />
      </View> 
    );
    
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
export default connect(mapStateToProps, mapDispatchToProps)(Header)