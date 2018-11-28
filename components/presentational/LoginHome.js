import React from 'react';
import * as base from './../../assets/styles/base';
import InputLegend from './InputLegend'
import InputField from './InputField'
import MainButton from './MainButton'
import NoteTaking from './NoteTaking'

import {  TouchableOpacity, Image, ScrollView, View, Text, StyleSheet, Animated, Keyboard, Easing } from 'react-native';


export default class LoginHome extends React.Component {
  constructor(props){
    super(props)
    this.goToRegistration = this.goToRegistration.bind(this)
    this.goToLogin = this.goToLogin.bind(this)
  }

  goToLogin(){ 
    this.props.goToStep(1, 'login')
  }

  goToRegistration(){
    this.props.goToStep(1, 'registration')
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
      imageContainer:{
        flex: 1,
        alignItems: 'center',
        minHeight: 256,
        maxHeight: 256
      }, 
      
      socialLoginContainer: {
        height: 88,
        paddingVertical: base.padding.md,
        marginTop: base.padding.lg,
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth: 1,
        borderBottomColor: base.colors.altGrey,
      },
      buttonContainer:{
        flex:1,
        paddingVertical: base.padding.md,
        alignItems: 'center',
        justifyContent:'flex-start', 
      },
      tagline:{
        fontFamily: 'cabin-medium',
        fontSize: 14,
        textAlign:'center',
        color: base.colors.black,
        marginTop: base.padding.md
      },
      facebookButton: {
        width:248,
        height:40,
        borderRadius: 20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#3D5B98'
      }, 
      facebookText:{
        color: 'white',
        fontFamily: "cabin-bold",
        minWidth: 172, 
        textAlign: 'center'
      },
      image: {
        width: 24, 
        height: 24,
        marginRight: base.padding.sm
      },
    })

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <NoteTaking/>
          <Text style={styles.tagline} >
            Bookworm vous permet de scanner des citations dans vos livres favoris à l'aide de votre téléphone :)
          </Text>
        </View>
       
        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={styles.facebookButton} onPress={this.props.handleFbLogin}>
            <Image style={styles.image} source={require('./../../assets/facebook-white.png')}  />
            <Text style={styles.facebookText}>Continuer avec Facebook</Text>
          </TouchableOpacity>
        </View>
    
        <View style={styles.buttonContainer}>
          <MainButton height={40} legend="Créer un compte" onPress={this.goToRegistration}/>
          <View style={styles.margin} />
          <MainButton inverted height={40} legend="Se connecter" onPress={this.goToLogin}/>
        </View> 
      </View>
    );
  }
}
