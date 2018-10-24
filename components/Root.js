import React from 'react';
import LoginHandler from './LoginHandler';
import NotesIndex from './NotesIndex';
import ScanFlowContainer from './ScanFlowContainer';
import EditFlowContainer from './EditFlowContainer';
import CustomFooter from './CustomFooter';
import ErrorContainer from './ErrorContainer';
import AssetLoader from './AssetLoader';
import { View, Platform, Text } from 'react-native';

// Subscribe and dispatch to redux store
import { connect } from 'react-redux';

// External components
import { NativeRouter, Route, Link, Redirect, Switch, withRouter  } from 'react-router-native';


//Homemade components


class Root extends React.Component {
  render () {
    return (

        <View> 
          <View>
            { Platform.OS === 'ios' ? null : <Left style={{flex: 1}} />}
           
            <View style={ Platform.OS === 'ios' ? 
              { backgroundColor: 'transparent' } : 
              { flex: 1, paddingTop: 24, alignItems: 'center'}
            }>
              <Text style={{fontFamily: 'cabin-bold', textAlign:'center'}}>bookworm</Text>
            
            </View>
            { Platform.OS === 'ios' ? null : <Right style={{flex: 1}}/>}
          </View>
          <View>
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
          </View>
          <View>
            { this.props.session.loggedIn ? 
              <CustomFooter /> : 
              null
            }
          </View>
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