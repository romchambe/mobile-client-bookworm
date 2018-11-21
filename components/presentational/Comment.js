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
        alignItems: 'center',
        marginTop: base.padding.xs
      },
      iconContainer:{
        flex: 1,
        maxWidth: 32,

      },
      textContainer:{
        flex: 1,
        backgroundColor: base.colors.yellowLight,
        borderRadius: 6,
        paddingHorizontal: base.padding.sm,
        paddingVertical: base.padding.xs,
      },
      legend:{
        fontFamily: 'cabin-italic',
        fontSize: base.fonts.md,
        color:base.colors.black,
      }
    })
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <CustomIcon name="comment" style={{paddingRight: base.padding.xs}}/>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.legend}>"{this.props.content}"</Text>
        </View>
      </View>
    );
  }
}