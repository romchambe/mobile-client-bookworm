import React from 'react';
import CustomIcon from './CustomIcon'
import * as base from './../../assets/styles/base';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class SideMenuLink extends React.Component {
  constructor(props){
    super(props)
    this.navigate = this.navigate.bind(this)
  }

  navigate(){
    this.props.onPress(this.props.link)
  }

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
      link:{
        flex:1,
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
        <TouchableOpacity style={styles.link} onPress={this.navigate}>
          <CustomIcon name={this.props.name}/>
          <Text style={styles.menuItem} >{this.props.menuItem}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}