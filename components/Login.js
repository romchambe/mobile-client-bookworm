import React from 'react';
import { Form, Item, Label, Input, Button, Text } from 'native-base';
import { View } from 'react-native';
import { colors } from './../assets/styles/base'

import { connect } from 'react-redux';
import * as sessionActions from './../redux-apis-bookworm/actions/sessionActions';
import { bindActionCreators } from 'redux'; 

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:''
    };
    this.postLogin = this.postLogin.bind(this);
    this.postFbLogin = this.postFbLogin.bind(this);
  }

  postLogin(e){
    e.preventDefault();
    this.props.actions.loginUser(this.state, 'mobile');
  }

  postFbLogin(e){
    console.log('clicked');
    e.preventDefault();
    this.props.actions.fbLoginUser('mobile');
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
          <View style={{paddingHorizontal:15, paddingVertical:15}}>
            <Button block primary onPress={this.postLogin}>
              <Text>Login</Text>
            </Button>
          </View>
        </View>
        
        <View style={{paddingHorizontal:30, paddingVertical:30}}>
          
            <Text>or continue with:</Text>
      
        </View>

        <View style={{paddingHorizontal:15, paddingVertical:15}}>
          <Button block primary onPress={this.postFbLogin} style={{backgroundColor:'#4469B0'}}>
            <Text style={{color:'#fff', fontFamily:'Helvetica'}}>Facebook</Text>
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

export default connect(null, mapDispatchToProps)(Login)