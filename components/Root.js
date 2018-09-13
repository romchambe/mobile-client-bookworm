import React from 'react';
import LoginHandler from './LoginHandler';
import NotesIndex from './NotesIndex';
import ScanFlowContainer from './ScanFlowContainer'
import CustomFooter from './CustomFooter';
import AssetLoader from './AssetLoader';
import { View } from 'react-native';
import createStyles from './../assets/styles/base.js';

// Native Base Theme
import getTheme from './../native-base-theme/components';
import commonColor from './../native-base-theme/variables/commonColor';

// Subscribe and dispatch to redux store
import { connect } from 'react-redux';

// External components
import { NativeRouter, Route, Link, Redirect, Switch, withRouter  } from 'react-router-native';
import { StyleProvider, Container, Header, Content, Footer, Body, Title, Button, Text } from 'native-base';

//Homemade components


class Root extends React.Component {
  render () {
    const styles = createStyles()
    
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container> 
          <Header>
            <Body>
              <Title>Bookworm</Title>
            </Body>
          </Header>
          <Content contentContainerStyle={{ flexGrow: 1 }}>
            <Switch>
              <Route exact path="/" render={ props =>
                this.props.session.loggedIn === true ? (
                  <NotesIndex />
                ) : (
                  <LoginHandler />
                )} 
              /> 
              <Route path='/login' component={LoginHandler} />
              <Route path='/notes' component={NotesIndex} />
              <Route path='/scan' component={ScanFlowContainer} />
            </Switch>
          </Content>
          <Footer>
            { this.props.session.loggedIn ? 
              <CustomFooter /> : 
              null
            }
          </Footer>
        </Container>
      </StyleProvider>
    );     
  }
}

function mapStateToProps(state) {
  return {
    session: state.session
  }
}

export default withRouter(connect(mapStateToProps)(Root))