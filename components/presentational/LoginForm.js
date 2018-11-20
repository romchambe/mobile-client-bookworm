import React from 'react';
import * as base from './../../assets/styles/base';
import InputLegend from './InputLegend'
import InputField from './InputField'
import MainButton from './MainButton'
import NoteTaking from './NoteTaking'

import { ScrollView, View, Text, StyleSheet, Animated, Image, Keyboard, Easing, Dimensions } from 'react-native';


export default class LoginForm extends React.Component {
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
    const { width, height } = Dimensions.get('window')

    const styles = StyleSheet.create({
      container:{
        flex:1,
        justifyContent: 'flex-start',
        paddingHorizontal: base.padding.md,
      },
      margin:{
        marginBottom: 16
      },
      field: {
        marginBottom: 16
      },
      formContainer:{
        flex:3,
        justifyContent:'flex-start'
      },
      buttonContainer:{
        position: 'absolute',
        bottom: 0,
        left: 0, 
        right: 0,
        height: 96,
        justifyContent: 'center',
        alignItems:'center'
      },
    })

    const nameField = 
      <View style={styles.field}>
        <InputLegend legend='Votre prénom' />  
        <InputField placeholder="Moi c'est Wormsie, et toi?" handleChange={this.props.handleForm} />
      </View>

    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          { this.props.form === 'login' ? null : nameField }
          <View style={styles.margin} />
          <InputLegend legend='Email' />  
          <InputField 
            name="email" 
            placeholder="On préfère un vrai mais on ira pas vérifier ;)" 
            handleChange={this.props.handleForm}
          />
          <View style={styles.margin} />
          <InputLegend legend="Mot de passe" />
          <InputField name="password" placeholder="Au moins 6 caractères" handleChange={this.props.handleForm}/>
        </View>
        <View style={styles.buttonContainer}>
          <MainButton 
            height={40} 
            legend={this.props.form === 'login' ? 'Se connecter' : 'Créer un compte'} 
            onPress={this.props.handleSubmit}
          />
        </View>
      </View>
    );
  }
}

