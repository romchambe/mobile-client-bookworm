import React from 'react';
import * as base from './../../assets/styles/base';

import { connect } from 'react-redux'

import { View, ScrollView, Text, StyleSheet } from 'react-native';

class Header extends React.Component {
  render() {
    const styles = StyleSheet.create({
      container:{
        flex: 1, 
        minHeight: 76,
        maxHeight:76,
        paddingTop: 28,
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