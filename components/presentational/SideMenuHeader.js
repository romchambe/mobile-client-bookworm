import React from 'react';
import * as base from './../../assets/styles/base';
import Badge from './Badge';
import { View, Text, StyleSheet } from 'react-native';

export default class SideMenuHeader extends React.Component {
  render() {
    const styles = StyleSheet.create({
      container:{
        flex: 1,
        flexDirection: 'row',
        maxHeight: 40,
        justifyContent:'space-between',
        alignItems:'center',
      },
      username:{
        flex:1,
        color: base.colors.blue, 
        fontFamily: 'cabin-bold',
        fontSize: base.fonts.lg,
        marginLeft: base.padding.sm,
      }, 
      noteCount:{
        maxWidth: 56,
        marginHorizontal: base.padding.sm,
        textAlign: 'right',
        color: base.colors.black,

      }
    })
    return (

      <View style={styles.container}>
        <Badge name={this.props.name}/> 
        <Text style={styles.username} numberOfLines={1} >{this.props.name}</Text>
        <Text style={styles.noteCount}> {this.props.noteCount} notes </Text>
      </View>
    );
  }
}