import React from 'react';
import Login from './Login';
import About from './About';
import AssetLoader from './AssetLoader';
import { View } from 'react-native';
import createStyles from './../assets/styles/base.js';

// Native Base Theme
import getTheme from './../native-base-theme/components';
import commonColor from './../native-base-theme/variables/commonColor';

// Subscribe and dispatch to redux store
import { connect } from 'react-redux';
import * as assetActions from './../redux-apis-bookworm/actions/assetActions';
import { bindActionCreators } from 'redux'; 

// External components
import { NativeRouter, Route, Link } from 'react-router-native';
import { StyleProvider, Container, Header, Content, Footer, FooterTab, Body, Title, Button, Text } from 'native-base';

//Homemade components


class Root extends React.Component {
  render () {
    const styles = createStyles();

    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container> 
          <Header>
            <Body>
              <Title>Bookworm</Title>
            </Body>
          </Header>
          <Content contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.pageContainer} >
              <Route path="/login" component={Login} />
              <Route path="/about" component={About} />
            </View>
          </Content>
          <Footer>
            <FooterTab>
              <Button>
              <Link to='/login'>
                <Text>Login</Text>
              </Link>
              </Button>
              <Button>
              <Link to='/about'>
                <Text>About</Text>
              </Link>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </StyleProvider>
    );     
  }
}


export default Root