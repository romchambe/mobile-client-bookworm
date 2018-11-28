import React from 'react';
import * as base from './../../assets/styles/base';

import { connect } from 'react-redux'

import { View, ScrollView, Text, StyleSheet, Platform, Dimensions } from 'react-native';

class Header extends React.Component {
  render() {
    const { width, height } = Dimensions.get('window')
    const styles = StyleSheet.create({
      container:{
        width: width,
        height: Platform.OS === 'ios' ? 76 : 56,
        paddingTop: Platform.OS === 'ios'? 28 : base.padding.xs,
        paddingHorizontal: base.padding.sm,
        paddingBottom: base.padding.xs,

      },
      scrollContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',

      }
    })
    return (
      <View style={styles.container} >
        <ScrollView scrollEnabled={false} contentContainerStyle={styles.scrollContainer}>
          {this.props.children}
        </ScrollView>
      </View>
    );
  }
}

export default Header