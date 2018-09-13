import React from 'react';
import CustomFloatingLabel from './CustomFloatingLabel'
import { Form, Item, Label, Input, Button, Text } from 'native-base';
import { View, Image } from 'react-native';
import createStyles from './../assets/styles/base'

import { connect } from 'react-redux';
import * as sessionActions from './../redux-apis-bookworm/actions/sessionActions';
import * as userActions from './../redux-apis-bookworm/actions/userActions';
import { bindActionCreators } from 'redux'; 

class SignUpForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:'', 
      password_confirmation:''
    };
    this.postSignUp = this.postSignUp.bind(this);
    this.postFbLogin = this.postFbLogin.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
  }

  postSignUp(e){
    e.preventDefault();
    this.props.userActions.createUser(this.state, 'mobile');
  }

  postFbLogin(e){
    console.log('clicked');
    e.preventDefault();
    this.props.sessionActions.fbLoginUser('mobile');
  }

  handleEmailChange(email) {
    this.setState({email: email})
  }

  handlePasswordChange(password) {
    this.setState({password: password})
  }

  handleConfirmPasswordChange(confirmPassword) {
    this.setState({password_confirmation: confirmPassword})
  }

  render () {
    const styles = createStyles()
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
          <CustomFloatingLabel 
            label="Confirm password"
            onChangeText={this.handleConfirmPasswordChange}
            secureTextEntry={true}
          />
          
          <View style={styles.mdPaddingView}>
            <Button block primary onPress={this.postSignUp}>
              <Text style={{fontFamily: 'cabin-bold'}}>Sign up</Text>
            </Button>
          </View>
        </View>
        
        <View style={styles.lgPaddingView}>
          
            <Text style={{fontFamily: 'cabin-bold'}}>or continue with:</Text>
      
        </View>

        <View style={ styles.mdPaddingView }>
          <Button block primary onPress={this.postFbLogin} style={{backgroundColor:'#3D5B98'}}>
            <Image style={{width: 24, height: 24}} source={require('./../assets/facebook-white.png')}  />
            <Text style={{color:'#fff', fontFamily:'Helvetica', fontWeight: 'bold'}}>Facebook</Text>
          </Button>
        </View>
      </Form>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    sessionActions: bindActionCreators(sessionActions, dispatch), 
    userActions: bindActionCreators(userActions, dispatch), 
  }
}

export default connect(null, mapDispatchToProps)(SignUpForm)