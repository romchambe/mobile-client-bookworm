import React from 'react';
import SideMenuHeader from './SideMenuHeader';
import * as base from './../../assets/styles/base';
import { View, Text, StyleSheet } from 'react-native';

export default class SideMenu extends React.Component {
  render() {
    const styles = StyleSheet.create({
      container:{
        flex: 1,
        justifyContent:'flex-start',
        paddingTop: 28,
        paddingHorizontal: 12,
        minWidth: 260,
      },
      
    })
    return (

      <View style={styles.container}>
        <SideMenuHeader name={this.props.user} noteCount={this.props.noteCount} />
          

      </View>
    );
  }
}