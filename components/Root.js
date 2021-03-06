import React from 'react';

import AssetLoader from './AssetLoader'

import CustomIcon from './presentational/CustomIcon';
import Container from './presentational/Container';
import SideMenu from './presentational/SideMenu';
import HeaderTitle from './presentational/HeaderTitle';
import Header from './presentational/Header';

import BooksContainer from './containers/BooksContainer';
import ErrorsContainer from './containers/ErrorsContainer';
import NewBookContainer from './containers/NewBookContainer';
import ScanContainer from './containers/ScanContainer';
import AuthContainer from './containers/AuthContainer';
import BookEditContainer from './containers/BookEditContainer';
import ProfileContainer from './containers/ProfileContainer';

import { View, Platform, StyleSheet, Animated, StatusBar, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
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
    this.showMenu = this.showMenu.bind(this)
    this.hideMenu = this.hideMenu.bind(this)
  }

  navigateTo(nextPage){
    switch(nextPage){
      case 'books': 
        return this.props.actions.navigateToBooks();
      case 'new':
        return this.props.actions.navigateToNew();
      case 'scan':
        return this.props.actions.navigateToScan();
      case 'profile':
        return this.props.actions.navigateToProfile();
    }
  }

  pageTitle(location){
    if (location.includes('/edit')){
      return this.props.flow.title ? this.props.flow.title : '';
    }
    switch(location){
      case '/':
        return this.props.session.loggedIn ? 
          'Mes livres' : 
          this.props.flow.title ? 
            this.props.flow.title : 
            'Bookworm';
      case '/books':
        return 'Mes livres';
      case '/login':
        return 'Bookworm';
      case '/profile':
        return 'Mon profil';
      case '/new':
        return this.props.flow.title ? this.props.flow.title : 'Nouveau livre';
      case '/scan':
        return this.props.flow.title ? this.props.flow.title : 'Scan';
    }
  }

  showMenu() {
    Animated.timing(this.state.menuPosition, {
      toValue: 0,
      duration: 150
    }).start()
  }

  hideMenu(nextPage){
    let action = !!nextPage ? () => {
      this.navigateTo(nextPage)
    } : null
    Animated.timing(this.state.menuPosition, {
      toValue: -260,
      duration: 150
    }).start(action)
  }

  render () {
    const { width, height } = Dimensions.get('window')

    const styles = StyleSheet.create({
      flexView: {
        flex: 1
      },
    })

    return (
      <View style={styles.flexView}>
        <StatusBar
          backgroundColor={base.colors.blue}
          barStyle="default"
        />
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
            width: width,
            height: height,

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
              (this.props.session.loggedIn && (!this.props.flow.started || this.props.flow.step > 0)) || this.props.flow.step > 0 ? 
                <CustomIcon 
                  name={this.props.flow.started ? "keyboard-arrow-left" : "menu"} 
                  onPress={this.props.flow.started ? () => {
                    this.props.flow.back()
                  } : this.showMenu }
                  rounded={this.props.flow.started ? false : true}
                /> : <View style={{height: 36, width: 36, backgroundColor:'transparent'}} />
            }
            
            <HeaderTitle>
              {this.pageTitle(this.props.pathname)}
            </HeaderTitle>
            {
              this.props.session.loggedIn ? <CustomIcon 
                rounded={this.props.flow.started ? false : true}
                name={ this.props.flow.started ? "close" : "scan"}  
                onPress={ this.props.flow.started ? () => this.navigateTo('books') : () => this.navigateTo('scan')}
              /> :  <View style={{height: 36, width: 36, backgroundColor:'transparent'}} />
            }

          </Header> 
          <ErrorsContainer />
          <Container>
            <Switch>
              <Route exact path="/" component={this.props.session.loggedIn ? BooksContainer : AuthContainer}/> 
              <Route exact path="/login" component={AuthContainer} /> 
              <Route exact path="/books" component={BooksContainer}/> 
              <Route path='/new' component={NewBookContainer}/>
              <Route path='/edit/:id' component={BookEditContainer}/>
              <Route path='/profile' component={ProfileContainer}/>
              <Route path='/scan' component={ScanContainer}/>
            </Switch>
          </Container>
         
        </Animated.View>
        <Animated.View style={{
          position: 'absolute',
          zIndex: 10,
          width:width - 260,
          height:height,
          transform: [{
            translateX: this.state.menuPosition.interpolate({
              inputRange: [-260, 0],
              outputRange: [width, 260]
            }) 
          }],
          
        }}>
          <TouchableOpacity style={styles.flexView} onPress={this.hideMenu}>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{
          position: 'absolute',
          height: height,
          left: this.state.menuPosition,
        }}>
          <SideMenu 
            user={this.props.user.username} 
            bookCount={this.props.books.length}
            navigate={this.hideMenu} 
          />
        </Animated.View>
      </View> 
    );

  }
}

function mapStateToProps(state) {
  return {
    fetching: state.fetching,
    session: state.session,
    books: state.books.booksList, 
    pathname: state.router.location.pathname,
    flow: state.flow,
    user: state.user
  }
}
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({}, navigationActions, sessionActions, flowActions), dispatch)
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Root))