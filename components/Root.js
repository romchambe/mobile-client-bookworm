import React from 'react';

import CustomIcon from './presentational/CustomIcon';
import Container from './presentational/Container';
import SideMenu from './presentational/SideMenu';
import HeaderTitle from './presentational/HeaderTitle';
import Header from './presentational/Header';

import BooksContainer from './containers/BooksContainer';
import ErrorsContainer from './containers/ErrorsContainer';
import NewBookContainer from './containers/NewBookContainer';
import ScanContainer from './containers/ScanContainer';
import AuthContainer from './containers/AuthContainer'

import AssetLoader from './AssetLoader';
import { View, Platform, StyleSheet, Animated, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import * as base from './../assets/styles/base';

// Subscribe and dispatch to redux store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import * as navigationActions from './../core-modules/actions/navigationActions'
import * as sessionActions from './../core-modules/actions/sessionActions'
import * as flowActions from './../core-modules/actions/flowActions'

// External components
import { NativeRouter, Route, Link, Redirect, Switch, withRouter  } from 'react-router-native';

class Root extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      menuPosition: new Animated.Value(-260),
    }
    this.navigateTo = this.navigateTo.bind(this)
    this.pageTitle = this.pageTitle.bind(this)
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

  pageTitle(location){
    switch(location){
      case '/':
        return this.props.session.loggedIn ? 
          'Mes livres' : 
          this.props.flow.title ? 
            this.props.flow.title : 
            'Bookworm';
      case '/books':
        return 'Mes livres';
      case '/new':
        return 'Nouveau' //this.props.flow.title;
      case '/scan':
        return 'Scan' //this.props.flow.title;
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
          }}/>
          <Header>
            { 
              this.props.session.loggedIn || this.props.flow.step > 0 ? 
                <CustomIcon 
                  name={this.props.flow.started ? "keyboard-arrow-left" : "menu"} 
                  onPress={this.props.flow.started ? () => {
                    this.props.flow.back()
                  } : showMenu }
                  rounded={this.props.flow.started ? false : true}
                /> : null
            }
            
            <HeaderTitle>
              {this.pageTitle(this.props.pathname)}
            </HeaderTitle>
            {
              this.props.session.loggedIn ? <CustomIcon 
                rounded={this.props.flow.started ? false : true}
                name={ this.props.flow.started ? "close" : "scan"}  
                onPress={ this.props.flow.started ? () => this.navigateTo('books') : () => this.navigateTo('scan')}
              /> : null 
            }

          </Header> 
          <ErrorsContainer />
          <Container>
            <Switch>
              <Route exact path="/" component={this.props.session.loggedIn ? BooksContainer : AuthContainer}/> 
              <Route exact path="/books" component={BooksContainer}/> 
              <Route path='/new' component={NewBookContainer}/>
              <Route path='/scan' component={ScanContainer}/>
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
          <SideMenu user="Romain" bookCount="3" navigate={hideNavigate} logout={this.props.actions.logout} />
        </Animated.View>
      </View> 
    );

  }
}

function mapStateToProps(state) {
  return {
    session: state.session,
    pathname: state.router.location.pathname,
    flow: state.flow
  }
}
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({}, navigationActions, sessionActions, flowActions), dispatch)
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Root))