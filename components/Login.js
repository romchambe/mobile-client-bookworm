import React from 'react';
import { Text, View } from 'react-native';
import { Form, Item, Label, Input, Button } from 'native-base';
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

  }

  postLogin(e){
    e.preventDefault();
    console.log(this.state);
    this.props.actions.loginUser(this.state, 'mobile');
  }

  render () {
    return (
      <Form>
        <Item floatingLabel>
          <Label>Email</Label>
          <Input onChangeText={(email) => this.setState({email: email})}/>
        </Item>
        <Item floatingLabel last>
          <Label>Password</Label>
          <Input onChangeText={(password) => this.setState({password: password})}/>
        </Item>
        <Button block success onPress={this.postLogin}>
          <Text>Login</Text>
        </Button>
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