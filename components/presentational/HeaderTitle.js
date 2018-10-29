import React from 'react';
import * as base from './../../assets/styles/base';
import Subtitle from './Subtitle';
import { View, Text, StyleSheet } from 'react-native';

export default class HeaderTitle extends React.Component {
  render() {
    const styles = StyleSheet.create({
      container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal: 12,
        minHeight: 40
      },
      title: {
        fontSize: base.fonts.lg,
        fontFamily: 'cabin-bold',
        color: base.colors.blue,
      }
    })
    return (
      <View style={styles.container} >
        <Text style={styles.title} numberOfLines={1}>
          {this.props.children}
        </Text>
        {
          this.props.subtitle ? (<Subtitle>
            {this.props.subtitle}
          </Subtitle>) : null
        }
        
      </View>
    );
  }
}