import React from 'react';
import { Form, Item, Label, Input, Button, Text } from 'native-base';
import { View, Image } from 'react-native';
import { colors } from './../assets/styles/base'

import { connect } from 'react-redux';
import * as sessionActions from './../redux-apis-bookworm/actions/sessionActions';
import * as userActions from './../redux-apis-bookworm/actions/userActions';
import { bindActionCreators } from 'redux'; 

class SignUpForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:''
    };
    this.postSignUp = this.postSignUp.bind(this);
    this.postFbLogin = this.postFbLogin.bind(this);
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

  render () {
    return (
      <Form>
        <View >
          <Item floatingLabel>
            <Label>Email</Label>
            <Input onChangeText={(email) => this.setState({email: email})}/>
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input onChangeText={(password) => this.setState({password: password})}/>
          </Item>
          <Item floatingLabel>
            <Label>Confirm password</Label>
            <Input onChangeText={(password) => this.setState({password: password})}/>
          </Item>
          <View style={{paddingHorizontal:15, paddingVertical:15}}>
            <Button block primary onPress={this.postSignUp}>
              <Text>Sign Up</Text>
            </Button>
          </View>
        </View>
        
        <View style={{paddingHorizontal:30, paddingVertical:30}}>
          
            <Text>or continue with:</Text>
      
        </View>

        <View style={{paddingHorizontal:15, paddingVertical:15}}>
          <Button block primary onPress={this.postFbLogin} style={{backgroundColor:'#3D5B98'}}>
            <Image style={{width: 24, height: 24}} source={require('./../assets/facebook-white.png')}  />
            <Text style={{color:'#fff', fontFamily:'Helvetica'}}>Facebook</Text>
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