import React from 'react';
import MainButton from './MainButton'

import * as base from './../../assets/styles/base';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default class ResizePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      promptOpacity: new Animated.Value(1)
    }
  }
  //On resize start, cacher le prompt avec Animated.timing

  
  render() {
    const styles = StyleSheet.create({
      container:{
        flex:1, 
        justifyContent: 'flex-start',
        paddingHorizontal: base.padding.md
      },
      resizeComp:{
        flex:1,
        marginHorizontal: - base.padding.md,
        marginBottom: 72,
        backgroundColor: 'rgba(30,30,36, 0.6)',
        alignItems:'center'
      },
      resizePrompt:{
        marginTop: base.padding.md,
        fontFamily: 'cabin-bold',
        color: 'white',
        fontSize: base.fonts.lg
      },
      bottomActions:{
        position: 'absolute',
        bottom:0,
        left: 0,
        right:0,
        height:72,
        backgroundColor: 'rgba(30,30,36, 0.6)',
        paddingTop: base.padding.sm,
        justifyContent:'flex-start',
        alignItems:'center'
      },
      actionsText:{
        marginTop: 4,
        fontFamily: 'cabin',
        color: 'white',
        fontSize: base.fonts.sm
      }

     
    })
    return (
      <View style={styles.container}>
        <View style={styles.resizeComp}>
          <Animated.Text style={[styles.resizePrompt, 
            {
              opacity: this.state.promptOpacity
            }
          ]}> 
            Ajustez la taille du cadre!
          </Animated.Text>
        </View>

        <View style={styles.bottomActions}>
          
          <MainButton height={32} onPress={this.props.nextStep} legend='Extraire le texte' />
          <Text style={styles.actionsText}>Vous pourrez l’ajouter à l’un de vos livres ou en créer un</Text>
        </View>
      </View>
    );
  }
}