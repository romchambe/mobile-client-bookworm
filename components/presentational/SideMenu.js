import React from 'react';

import SideMenuHeader from './SideMenuHeader';
import SideMenuLink from './SideMenuLink';
import PublicLink from './PublicLink'
import * as base from './../../assets/styles/base';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import * as navigationActions from './../../core-modules/actions/navigationActions'

class SideMenu extends React.Component {
  constructor(props){
    super(props)
    this.navigate = this.navigate.bind(this)
  }

  navigate(link){
    this.props.navigate(link)
  }

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
        <SideMenuHeader name={this.props.user} bookCount={this.props.bookCount} />
        <View style={styles.menuContainer}>
          <SideMenuLink name="book" menuItem="Mes livres"  link='books' onPress={this.navigate}/>
          <SideMenuLink name="note-add" menuItem="Nouveau livre" link='new' onPress={this.navigate}/>
          <SideMenuLink name="person" menuItem="Profil" link='profile' onPress={this.navigate}/>  
        </View>
        <View style={styles.linkContainer}>
          <PublicLink link="À propos de Bookworm" />
          <PublicLink link="Politique de confidentialité" />
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(navigationActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(SideMenu)
