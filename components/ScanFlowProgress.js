import React from 'react';

import FlowDot from './FlowDot'

import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import { colors, padding } from './../assets/styles/base.js';


class ScanFlowProgress extends React.Component {
  
  
  render () {
    const styles = StyleSheet.create({
      container: {
        flex:1, 
        maxHeight: 60, 
        justifyContent: 'center',
        borderBottomColor: colors.yellow,
        borderBottomWidth: 2,
        backgroundColor: colors.yellow
      }, 
      text:{
        flex:1, 
        flexDirection:'row', 
        textAlign:'center', 
        marginTop: padding.sm, 
        fontFamily: 'cabin-bold', 
        color: colors.deepBlue
      },
      dotsContainer:{
        flex: 1, 
        maxHeight: padding.md, 
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems:'flex-start'
      }
    }) 
    return (      
      <View style={styles.container}>
          <Text style={styles.text}>
            {this.props.content}
          </Text>
          <View style={styles.dotsContainer} >
            <FlowDot id={1} step={this.props.step}/>
            <FlowDot id={2} step={this.props.step}/>
            <FlowDot id={3} step={this.props.step}/>
          </View>
        </View>
    )
  }
}

export default ScanFlowProgress