import React from 'react';
import * as base from './../../assets/styles/base';
import InputLegend from './InputLegend'
import InputField from './InputField'
import MainButton from './MainButton'
import NoteTaking from './NoteTaking'

import { ScrollView, View, Text, StyleSheet, Animated, Keyboard, Easing } from 'react-native';


class LoginHome extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      keyboardAvoiding: new Animated.Value(0),
    }
  }

  componentDidMount() {
    this._keyboardWillShow = this._keyboardWillShow.bind(this)
    this._keyboardWillHide = this._keyboardWillHide.bind(this)
    this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  // Hide bottom actions when keyboard show, show them otherwise
  _keyboardWillHide(e){
    Animated.timing(this.state.keyboardAvoiding, {
      toValue: 0,
      duration: e.duration,
      easing: Easing.bezier(0.1, 0.76, 0.55, 0.9)
    }).start()
  }

  _keyboardWillShow(e){
    Animated.timing(this.state.keyboardAvoiding, {
      toValue: 248,
      duration: e.duration,
       easing: Easing.bezier(0.1, 0.76, 0.55, 0.9)
    }).start()
  }

  
  render() {
    const styles = StyleSheet.create({
      container:{
        flex:1,
        justifyContent: 'flex-start',
        paddingHorizontal: base.padding.md,
      },
      margin:{
        marginBottom: base.padding.sm
      },
    
      tagline:{
        fontFamily: 'cabin-medium',
        fontSize: 14,
        textAlign:'center',
        color: base.colors.black,
      },
      imageContainer:{
        flex: 1,
        alignItems: 'center',
        maxHeight: 212,
        minHeight: 212
      }, 
      taglineContainer:{
        flex: 1,
        alignItems: 'center',
        marginTop: base.padding.xl
      },
      buttonContainer:{
        flex:1,
        marginTop: base.padding.lg,
        alignItems: 'center'
      }
    })

    return (
      <View style={styles.container}>
       
       
        <View style={styles.imageContainer}>
          <NoteTaking/>
        </View>
        <View style={styles.taglineContainer}>
          <Text style={styles.tagline} >
            Bookworm vous permet de scanner des citations dans vos livres favoris à l'aide de votre téléphone :)
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <MainButton height={40} legend="Créer un compte" onPress={}/>
          <View style={styles.margin} />
          <MainButton inverted height={40} legend="Se connecter" />
        </View> 

        
      </View>
    );
  }
}

export default LoginHome