import React from 'react';

import FlowDot from './FlowDot'

import { StyleSheet, View, Text } from 'react-native';
import { colors, padding, fonts } from './../assets/styles/base.js';
import { connect } from 'react-redux';

class ErrorContainer extends React.Component {
  
  
  render () {
    const styles = StyleSheet.create({
      container: {
        flex:1, 
        height: 30,
        maxHeight: 30,
        backgroundColor: colors.red
      }, 
      text:{
        flex:1, 
        flexDirection:'row', 
        textAlign:'center', 
        fontFamily: 'cabin-bold',
        paddingVertical: 8,
        color: 'white',
        fontSize: fonts.sm
      },
    }) 

  

    if (this.props.error.length === 0) { 
      return null 
    } else {
      return (      
        <View style={styles.container}>
        
            
              <Text style={styles.text}>
                {this.props.error.slice(-1)[0]}
              </Text>
          
        </View>
      )  
    }
  }
}

function mapStateToProps(state){
  return {
    error: state.error
  }
}

export default connect(mapStateToProps)(ErrorContainer)