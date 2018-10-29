import React from 'react';
import CustomIcon from './icons/CustomIcon';
import SideMenu from './presentational/SideMenu'
import HeaderTitle from './presentational/HeaderTitle';
import ErrorContainer from './ErrorContainer';
import AssetLoader from './AssetLoader';
import { View, Platform, StyleSheet, Text } from 'react-native';
import * as base from './../assets/styles/base';

// Subscribe and dispatch to redux store
import { connect } from 'react-redux';

// External components
import { NativeRouter, Route, Link, Redirect, Switch, withRouter  } from 'react-router-native';


//Homemade components


class Root extends React.Component {
  render () {
    const styles = StyleSheet.create({
      header: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        minHeight: 76,
        paddingTop: 28,
        paddingHorizontal: base.padding.sm,
        paddingBottom: 8,
      },
    })
    return (
        <View> 
          <SideMenu user="Romain" notesCount="3"/>
          <View style={styles.header}>
            <CustomIcon name="menu" rounded />
            <HeaderTitle >
              Mes livres
            </HeaderTitle>
            <CustomIcon name="scan" rounded />
          </View> 
          <View>
            <ErrorContainer />
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