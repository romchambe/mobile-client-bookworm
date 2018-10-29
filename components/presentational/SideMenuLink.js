import React from 'react';
import CustomIcon from './CustomIcon'
import * as base from './../../assets/styles/base';
import { View, Text, StyleSheet } from 'react-native';

export default class SideMenuLink extends React.Component {
  render() {
    const styles = StyleSheet.create({
      container:{
        paddingLeft:24,
        marginBottom: base.padding.md,
        flex: 1,
        maxHeight: 36,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }, 
      menuItem:{
        flex: 1,
        paddingLeft: base.padding.sm,
        fontFamily: 'cabin',
        color: base.colors.blue
      }
    })
    return (

      <View style={styles.container} >
        <CustomIcon name={this.props.name}/>
        <Text style={styles.menuItem} >{this.props.menuItem}</Text>
      </View>
    );
  }
}