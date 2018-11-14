import React from 'react';

import CustomIcon from './presentational/CustomIcon';
import Container from './presentational/Container';
import SideMenu from './presentational/SideMenu';
import Header from './presentational/Header';
import HeaderTitle from './presentational/HeaderTitle';

import BooksContainer from './containers/BooksContainer';
import ErrorsContainer from './containers/ErrorsContainer';
import NewBookContainer from './containers/NewBookContainer';
import ScanContainer from './containers/ScanContainer';
import appearsFromRight from './containers/appearsFromRight'

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
    this.state = {
      menuPosition: new Animated.Value(-260)
    }
    this.navigateTo = this.navigateTo.bind(this)
  }

  navigateTo(nextPage){
    switch(nextPage){
      case 'books': 
        return this.props.actions.navigateToBooks();
      case 'new':
        return this.props.actions.navigateToNew();
      case 'scan':
        return this.props.actions.navigateToScan();
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
   
    const showMenu = () => {
      Animated.timing(this.state.menuPosition, {
        toValue: 0,
        duration: 150
      }).start()
    }

    const hideMenu = () => {
      Animated.timing(this.state.menuPosition, {
        toValue: -260,
        duration: 150
      }).start()
    }

    const hideNavigate = (nextPage) => {
      Animated.timing(this.state.menuPosition, {
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
            translateX: this.state.menuPosition.interpolate({
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

            zIndex: this.state.menuPosition.interpolate({
              inputRange: [-260, 0], 
              outputRange:[0, 5]
            }),
            
            opacity: this.state.menuPosition.interpolate({
              inputRange: [-260, 0], 
              outputRange:[0, 0.6]
            }),
          }} />
        
          <Header>
            <CustomIcon name="menu" rounded onPress={showMenu}/>
            <HeaderTitle>
              Mes livres
            </HeaderTitle>
            <CustomIcon name="scan" rounded onPress={() => this.navigateTo('scan')}/>
          </Header> 
          <ErrorsContainer />
          <Container>
             <Switch>
           
              <Route exact path="/" component={appearsFromRight(BooksContainer)}/> 
              <Route exact path="/books" component={appearsFromRight(BooksContainer)}/> 
              <Route path='/new' component={appearsFromRight(NewBookContainer)}/>
              <Route path='/scan' component={appearsFromRight(ScanContainer)}/>
          
          
            </Switch>
            
          </Container>
         
        </Animated.View>
        <Animated.View style={{
          position: 'absolute',
          zIndex: 10,
          width:dimensions.width - 260,
          height:dimensions.height,
          transform: [{
            translateX: this.state.menuPosition.interpolate({
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
          left: this.state.menuPosition,
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