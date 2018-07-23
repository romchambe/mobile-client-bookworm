import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Container, Content, Spinner } from 'native-base';
import { colors } from './../assets/styles/base.js';


class AssetLoader extends React.Component {
  
  
  render () {
    const stylesheet = StyleSheet.create({
      container: {
        backgroundColor: colors.deepBlue
      }
    }) 
    return (
      <Container style={stylesheet.container}> 
        <Content>
          <Spinner color={colors.yellow} />
        </Content>
      </Container>
    )
  }
}

export default AssetLoader