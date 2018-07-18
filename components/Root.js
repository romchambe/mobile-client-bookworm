import React from 'react';

// External components
import { NativeRouter, Route, Link } from 'react-router-native';
import { Container, Header, Content, Footer, FooterTab, Body, Title, Button, Text } from 'native-base';

//Homemade components


class Root extends React.Component {
  render () {
    return (
      <Container> 
        <Header>
          <Body>
            <Title>Header</Title>
          </Body>
        </Header>
        <Content>
         
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
    )
  }
}

export default Root 