import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Container, Content, Spinner } from 'native-base';
import { colors } from './../assets/styles/base.js';


class AssetLoader extends React.Component {
  
  
  render () {
    const stylesheet = StyleSheet.create({
      container: {
        backgroundColor: colors.deepBlue
      }, 
      centered: {
        flex:1, 
        alignItems: 'center'
      }
    }) 
    return (
      <Container style={stylesheet.container}> 
        <Content contentContainerStyle={{ flexGrow: 1 }}>
          <View style={stylesheet.centered}>
            <Spinner color={colors.yellow} />
          </View>
        </Content>
      </Container>
    )
  }
}

export default AssetLoader