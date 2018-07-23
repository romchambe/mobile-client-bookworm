import React from 'react';
import Login from './Login';
import About from './About';
import NotesIndex from './NotesIndex';
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
            <View style={styles.pageContainer} >
              <Switch>
                <Route exact path="/" render={ props =>
                  this.props.session.loggedIn === true ? (
                    <NotesIndex />
                  ) : (
                    <Login />
                  )} 
                /> 
                <Route path='/login' component={Login} />
                <Route path='/notes' component={NotesIndex} />
                <Route path='/about' component={About} />
              </Switch>
            </View>
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