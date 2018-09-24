import React from 'react';
import LoginHandler from './LoginHandler';
import NotesIndex from './NotesIndex';
import ScanFlowContainer from './ScanFlowContainer';
import EditFlowContainer from './EditFlowContainer';
import CustomFooter from './CustomFooter';
import ErrorContainer from './ErrorContainer';
import AssetLoader from './AssetLoader';
import { View } from 'react-native';

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
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container> 
          <Header>
            <Body>
              <Title style={{fontFamily: 'cabin-bold'}}>bookworm</Title>
            </Body>
          </Header>
          <Content contentContainerStyle={{ flexGrow: 1 }}>
            <ErrorContainer />
            <Switch>
              <Route path='/login' component={LoginHandler} />
              <Route exact path="/" render={ props =>
                this.props.session.loggedIn === true ? (
                  <NotesIndex />
                ) : (
                  <LoginHandler />
                )} 
              /> 
              <Route path='/notes' render={props =>
                this.props.session.loggedIn === true ? (
                  <NotesIndex />
                ) : (
                  <LoginHandler />
                )
              }/>
              <Route path='/scan' render={ props =>
                this.props.session.loggedIn === true ? (
                  <ScanFlowContainer />
                ) : (
                  <LoginHandler />
                )
              }/>
              <Route path='/edit' render={ props =>
                this.props.session.loggedIn === true ? (
                  <EditFlowContainer />
                ) : (
                  <LoginHandler />
                )
              }/>
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
    session: state.session,
  }
}

export default withRouter(connect(mapStateToProps)(Root))