import React from 'react';
import SideMenuHeader from './SideMenuHeader';
import SideMenuLink from './SideMenuLink';
import PublicLink from './PublicLink'
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
      menuContainer:{
        flex:1,
        justifyContent:'flex-start',
        paddingVertical: 40, 
        borderBottomWidth:1,
        borderColor: base.colors.altGrey
      },
      linkContainer:{
        flex:2, 
        paddingVertical: 40, 
      }
      
    })
    return (

      <View style={styles.container}>
        <SideMenuHeader name={this.props.user} noteCount={this.props.noteCount} />
        <View style={styles.menuContainer}>
          <SideMenuLink name="book" menuItem="Mes livres" />
          <SideMenuLink name="note-add" menuItem="Nouveau livre" />
          <SideMenuLink name="person" menuItem="Profil" />  
        </View>
        <View style={styles.linkContainer}>
          <PublicLink link="À propos de Bookworm" />
          <PublicLink link="Politique de confidentialité" />
        </View>
      </View>
    );
  }
}