import React from 'react';

import CustomIcon from './presentational/CustomIcon';
import Container from './presentational/Container';
import SideMenu from './presentational/SideMenu';
import Header from './presentational/Header';
import HeaderTitle from './presentational/HeaderTitle';

import BooksContainer from './containers/BooksContainer';
import ErrorsContainer from './containers/ErrorsContainer';
import NewBookContainer from './containers/NewBookContainer';

import AssetLoader from './AssetLoader';
import { View, Platform, StyleSheet, Animated, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import * as base from './../assets/styles/base';

// Subscribe and dispatch to redux store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import * as navigationActions from './../core-modules/actions/navigationActions'

// External components
import { NativeRouter, Route, Link, Redirect, Switch, withRouter  } from 'react-router-native';

class Root extends React.Component {
  constructor(props){
    super(props)
    this.navigateTo = this.navigateTo.bind(this)
  }

  navigateTo(nextPage){
    switch(nextPage){
      case 'books': 
        return this.props.actions.navigateToBooks();
      case 'new':
        return this.props.actions.navigateToNew();
    }
  }

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

    const hideNavigate = (nextPage) => {
      Animated.timing(menuPosition, {
        toValue: -260,
        duration: 150
      }).start(() => {
        this.navigateTo(nextPage)
      })
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
          <ErrorsContainer />
          <Container>
             <Switch>
           
              <Route exact path="/" component={BooksContainer}/> 
              <Route exact path="/books" component={BooksContainer}/> 
              <Route path='/new' component={NewBookContainer}/>
          
          
            </Switch>
            
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
          <SideMenu user="Romain" noteCount="3" navigate={hideNavigate} />
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
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(navigationActions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Root))