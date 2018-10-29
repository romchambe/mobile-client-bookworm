import React from 'react';
import SideMenuHeader from './SideMenuHeader';
import SideMenuLink from './SideMenuLink';
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
      linkContainer:{
        flex:1,
        justifyContent:'flex-start',
        marginTop: 40
      }
      
    })
    return (

      <View style={styles.container}>
        <SideMenuHeader name={this.props.user} noteCount={this.props.noteCount} />
        <View style={styles.linkContainer}>
          <SideMenuLink name="book" menuItem="Mes livres" />
          <SideMenuLink name="note-add" menuItem="Nouveau livre" />
          <SideMenuLink name="person" menuItem="Profil" />  
        </View>

      </View>
    );
  }
}