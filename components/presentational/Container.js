import React from 'react';
import * as base from './../../assets/styles/base';

import { ScrollView, Text, StyleSheet, Dimensions } from 'react-native';

export default class Container extends React.Component {
  render() {
    const { width, height } = Dimensions.get('window')
    const styles = StyleSheet.create({
    
      container:{
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor:'transparent',
      }      
    })

    return (
      <ScrollView scrollEnabled={false} contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
        {this.props.children}
      </ScrollView>
    );
  }
}