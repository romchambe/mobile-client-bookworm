import React from 'react';
import MainButton from './MainButton'
import ReadingImage from './ReadingImage'

import * as base from './../../assets/styles/base';
import { View, Text, StyleSheet } from 'react-native';

export default class EmptyBooksList extends React.Component {
  render() {
    const styles = StyleSheet.create({
      container:{
        flex:1, 
        alignItems:'center',
        marginTop: base.padding.xl,
      },
      tagline:{
        fontFamily: 'cabin-bold',
        fontSize: 14,
        textAlign:'center',
        color: base.colors.black
      },
      buttonContainer: {
        marginVertical: base.padding.sm,
      },
      imageContainer:{
        marginTop: base.padding.xl
      },
      quoteContainer:{
        marginTop: base.padding.md,
        alignItems:'center',
      },
      normal: {
        fontFamily: 'cabin',
        fontSize: 14,
        color: base.colors.black
      }
      
    });

    return (
      <View style={styles.container}>
        <Text style={styles.tagline} >
          Bienvenue! 
        </Text>
        <Text style={styles.tagline} >
          Quel livre lisez-vous en ce moment?
        </Text>
        <View style={styles.buttonContainer}>
          <MainButton height={40} legend="Nouveau Livre" onPress={this.props.newBook}/>
        </View>
        <View style={styles.imageContainer}> 
          <ReadingImage />
        </View>

        <View style={styles.quoteContainer}>
          <Text style={styles.tagline}>
            "Lire paisiblement est mon passe-temps préféré"
          </Text>
          <Text style={styles.normal}>
            Jean-Michel Lecture
          </Text>
        </View>
      </View>
    );
  }
}