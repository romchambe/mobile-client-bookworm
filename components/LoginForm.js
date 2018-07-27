import React from 'react';
import { Form, Item, Label, Input, Button, Text } from 'native-base';
import { View, Image } from 'react-native';
import createStyles from './../assets/styles/base'

import { connect } from 'react-redux';
import * as sessionActions from './../redux-apis-bookworm/actions/sessionActions';
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
    const styles = createStyles()
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
          <View style={styles.mdPaddingView}>
            <Button block primary onPress={this.postLogin}>
              <Text>Login</Text>
            </Button>
          </View>
        </View>
        
        <View style={styles.lgPaddingView}>
          
            <Text>or continue with:</Text>
      
        </View>

        <View style={styles.mdPaddingView}>
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
    actions: bindActionCreators(sessionActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(LoginForm)