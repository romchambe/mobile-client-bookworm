import React from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ToggleButton from './ToggleButton';
import AssetLoader from './AssetLoader';
import { View, StyleSheet } from 'react-native';
import { colors, padding } from './../assets/styles/base';

import { connect } from 'react-redux';


class LoginHandler extends React.Component {
  constructor(props){
    super(props); 
    this.state = {
      signUp: true
    }
  }

  render () {
    const styles = StyleSheet.create({
      toggleContainer: {
        marginTop:padding.lg,
        marginBottom: padding.int,
        marginHorizontal: 20,
        borderColor: colors.altGrey,
        borderWidth: 1,
        borderRadius: 28,
        paddingHorizontal: 4, 
        paddingVertical: 4, 
        flexDirection:'row',
        flex:0.75
      }
    })

    if (this.props.user.isFetching || this.props.session.isFetching ) {
      return (
        <AssetLoader />
      );
    } else {
      return (
        <View>
          <View style={styles.toggleContainer}>
            <ToggleButton content='First time?' active={this.state.signUp} onPress={() => this.setState({signUp: true})}/>
            <ToggleButton content='Not my first time' active={!this.state.signUp} onPress={() => this.setState({signUp: false})}/>
          </View>

          {
            this.state.signUp ? <SignUpForm /> : <LoginForm />
          }
          
        </View>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    session: state.session, 
    user:state.user
  }
}
export default connect(mapStateToProps)(LoginHandler)