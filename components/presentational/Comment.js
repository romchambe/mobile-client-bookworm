import React from 'react';
import * as base from './../../assets/styles/base';
import CustomIcon from './CustomIcon'
import { View, Text, StyleSheet } from 'react-native';

export default class Comment extends React.Component {
  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection:'row',
        alignItems: 'flex-start',
        marginTop: base.padding.xs
      },
      iconContainer:{
        width: 40,
        paddingRight: 4
      },
      textContainer:{
        flex: 1,
        paddingLeft: 4
      },
      legend:{
        fontFamily: 'cabin',
        fontSize: base.fonts.md,
        color:base.colors.blueMedium,
      }
    })
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <CustomIcon name="comment" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.legend}>{this.props.content}</Text>
        </View>
      </View>
    );
  }
}