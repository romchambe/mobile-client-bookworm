import React from 'react';
import * as base from './../../assets/styles/base';
import InputLegend from './InputLegend'
import InputField from './InputField'
import MainButton from './MainButton'
import NoteTaking from './NoteTaking'

import { ScrollView, View, Text, StyleSheet, Animated, Keyboard, Easing } from 'react-native';


class LoginPage extends React.Component {
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
        paddingTop: base.padding.lg
      },
      margin:{
        marginBottom: base.padding.md 
      },
    
      tagline:{
        fontFamily: 'cabin-medium',
        fontSize: 14,
        textAlign:'center',
        color: base.colors.black,
        marginTop: base.padding.lg
      },
      imageContainer:{
        flex: 1,
        alignItems: 'center',
        minHeight: 212
      }
    })
    return (
      <View style={styles.container}>
       
       
        <View style={styles.imageContainer}>
          <NoteTaking/>
        </View>
         <Text style={styles.tagline} >
          Bookworm vous permet de scanner des citations dans vos livres favoris à l'aide de votre téléphone :)
        </Text>
        <View style={styles.margin} />
        <View style={styles.margin} />
        <InputLegend legend='Votre prénom' />  
        <InputField placeholder="Faisons un peu connaissance" handleChange={this.props.handleName} />
        <View style={styles.margin} />
        <InputLegend legend='Votre email' />  
        <InputField placeholder="On préfère un vrai mais on ira pas vérifier ;)" handleChange={this.props.handleEmail} />
        <View style={styles.margin} />
        <InputLegend legend="Qui en est l'auteur?" />
        <InputField placeholder="Au moins 6 caractères" handleChange={this.props.handlePassword}/>
      </View>
    );
  }
}

export default LoginPage