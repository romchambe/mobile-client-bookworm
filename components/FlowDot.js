import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from './../assets/styles/base.js';


class FlowDot extends React.Component {
  
  
  render () {
    const styles = StyleSheet.create({
      activeDot: {
        height:8,
        width:8,
        borderRadius:4, 
        backgroundColor:colors.deepBlue, 
        marginHorizontal:4
      },
      inactiveDot: {
        height:8,
        width:8,
        borderRadius:4, 
        backgroundColor:colors.deepBlue, 
        marginHorizontal:4, opacity: 0.5
      },
    }) 
    return (      
      
      <View style={ (this.props.step === this.props.id) ? styles.activeDot : styles.inactiveDot } >
      </View>
            
    )
  }
}

export default FlowDot