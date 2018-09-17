import React from 'react';
import CustomFloatingLabel from './CustomFloatingLabel'
import { Form, Item, Label, Input, Button, Text } from 'native-base';
import { View, Image, StyleSheet } from 'react-native';
import { colors, padding } from './../assets/styles/base'

import { connect } from 'react-redux';
import * as sessionActions from './../core-modules/actions/sessionActions';
import { bindActionCreators } from 'redux'; 

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:''
    };
    this.postLogin = this.postLogin.bind(this);
    this.postFbLogin = this.postFbLogin.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  postLogin(e){
    e.preventDefault();
    this.props.actions.loginUser(this.state, 'mobile');
  }

  postFbLogin(e){
    e.preventDefault();
    this.props.actions.fbLoginUser('mobile');
  }

  handleEmailChange(email) {
    this.setState({email: email})
  }

  handlePasswordChange(password) {
    this.setState({password: password})
  }

  render () {
    const styles = StyleSheet.create({
      buttonContainer: {
        flex:1,
        flexDirection:'row',
        marginVertical: padding.lg,
        marginHorizontal: padding.int,
      }, 
      textContainer: {
        marginVertical: padding.sm, 
        marginHorizontal: padding.int
      },
      button: {
        flex: 1,
        height:50,
        borderRadius: 25,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
      },
      text: {
        fontFamily: 'cabin-bold',

      }, 
      facebookText:{
        color:'#fff', fontFamily:'Helvetica', fontWeight: 'bold'
      },
      image: {
        width: 24, height: 24
      },
      facebookButton: {
        flex: 1,
        height:50,
        borderRadius: 25,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#3D5B98'
      }, 
    })
    return (
      <Form>
        <View >
          <CustomFloatingLabel 
            label="Email"
            onChangeText={this.handleEmailChange}
          />
          <CustomFloatingLabel 
            label="Password"
            onChangeText={this.handlePasswordChange}
            secureTextEntry={true}
          />
          <View style={styles.buttonContainer}>
            <Button onPress={this.postLogin} style={styles.button} >
              <Text style={styles.text}>Login</Text>
            </Button>
          </View>
        </View>
        
        <View style={styles.textContainer}>
          
            <Text style={styles.text}>Or login with:</Text>
      
        </View>

        <View style={styles.buttonContainer}>
          <Button onPress={this.postFbLogin} style={styles.facebookButton}>
            <Image style={styles.image} source={require('./../assets/facebook-white.png')}  />
            <Text style={styles.facebookText}>Facebook</Text>
          </Button>
        </View>
      </Form>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(LoginForm)