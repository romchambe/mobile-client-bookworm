import React from 'react';
import CustomIcon from './presentational/CustomIcon';
import Container from './presentational/Container';
import SideMenu from './presentational/SideMenu';
import Header from './presentational/Header';
import HeaderTitle from './presentational/HeaderTitle';
import BooksContainer from './containers/BooksContainer';
import ErrorContainer from './containers/ErrorContainer';
import AssetLoader from './AssetLoader';
import { View, Platform, StyleSheet, Animated, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import * as base from './../assets/styles/base';

// Subscribe and dispatch to redux store
import { connect } from 'react-redux';

// External components
import { NativeRouter, Route, Link, Redirect, Switch, withRouter  } from 'react-router-native';



class Root extends React.Component {
  render () {
    const dimensions = {  
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width
    }

    const styles = StyleSheet.create({
      flexView: {
        flex: 1
      },

    })

    let menuPosition = new Animated.Value(-260)
   
    const showMenu = () => {
      Animated.timing(menuPosition, {
        toValue: 0,
        duration: 150
      }).start()
    }

    const hideMenu = () => {
      Animated.timing(menuPosition, {
        toValue: -260,
        duration: 150
      }).start()
    }

    return (
      <View style={styles.flexView}>
        <Animated.View style={{ 
          flex: 1,
          transform: [{
            translateX: menuPosition.interpolate({
              inputRange: [-260, 0],
              outputRange: [0, 260]
            }) 
          }]
        }}> 
          <Animated.View style={{
            position:'absolute',
            backgroundColor:"#C6C7C4",
            width:dimensions.width,
            height:dimensions.height,

            zIndex:menuPosition.interpolate({
              inputRange: [-260, 0], 
              outputRange:[0, 5]
            }),
            
            opacity: menuPosition.interpolate({
              inputRange: [-260, 0], 
              outputRange:[0, 0.6]
            }),
          }} />
        
          <Header>
            <CustomIcon name="menu" rounded onPress={showMenu}/>
            <HeaderTitle>
              Mes livres
            </HeaderTitle>
            <CustomIcon name="scan" rounded />
          </Header> 
          <ErrorContainer />
          <Container>
           
            <BooksContainer />
          </Container>
         
        </Animated.View>
        <Animated.View style={{
          position: 'absolute',
          zIndex: 10,
          width:dimensions.width - 260,
          height:dimensions.height,
          transform: [{
            translateX: menuPosition.interpolate({
              inputRange: [-260, 0],
              outputRange: [dimensions.width, 260]
            }) 
          }],
          
        }}>
          <TouchableOpacity style={styles.flexView} onPress={hideMenu}>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{
          position: 'absolute',
          height: dimensions.height,
          left: menuPosition,
        }}>
          <SideMenu user="Romain" noteCount="3"/>
        </Animated.View>
      </View> 
    );

  }
}

function mapStateToProps(state) {
  return {
    session: state.session,
    notes: state.notes
  }
}

export default withRouter(connect(mapStateToProps)(Root))