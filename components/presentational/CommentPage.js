import React from 'react';
import * as base from './../../assets/styles/base';
import InputLegend from './../presentational/InputLegend'
import InputField from './../presentational/InputField'
import swipeableComponent from './../containers/swipeableComponent'

import { View, Text, StyleSheet } from 'react-native';


class CommentPage extends React.Component {
  render() {
    const styles = StyleSheet.create({
      container:{
        flex:1,        
        justifyContent: 'flex-start',
        paddingHorizontal: base.padding.md
      }
    })
    return (
      <View style={styles.container}>
        <InputLegend noMargin legend='Cette citation vous inspire une pensée particulière?' />
        <InputLegend legend=' Ajoutez un commentaire si vous le souhaitez!' />
        <InputField 
          placeholder="Par ex: 'On note ici l'hommage de Molière à Burger Quiz'"
          handleChange={this.props.handleComment}
          name='content'
        />
      </View>
    );
  }
}
export default swipeableComponent(CommentPage)