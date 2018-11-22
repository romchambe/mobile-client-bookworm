import React from 'react';
import * as base from './../../assets/styles/base';
import QuoteTitle from './QuoteTitle'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

export default class Quote extends React.Component {
  
  shadow = new Animated.Value(0)

  render() {
    if (!this.props.disabled) {
      Animated.timing(this.shadow,{
        toValue: 1,
        duration: 250
      }).start()
    } else {
      Animated.timing(this.shadow,{
        toValue: 0,
        duration: 250
      }).start()
    }

    const styles = StyleSheet.create({
      quoteContainer:{
        marginHorizontal: 16,
        paddingVertical: base.padding.xs,
        paddingHorizontal: 12,
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        borderRadius: 4,
        shadowColor: base.colors.blueLight,
        marginBottom: base.padding.xs,
        marginTop: base.padding.lg
      },
      legend:{
        fontFamily: 'cabin-semi-bold',
        fontSize: base.fonts.md,
        color:base.colors.blue,

      }
    })
    return (
      <AnimatedTouchable 
        disabled={this.props.disabled} 
        onPress={() => this.props.onPress({id: this.props.id, type: 'quote'})}
        style={[
          styles.quoteContainer,
          {
            elevation: this.shadow,
            shadowRadius: this.shadow.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 6]
            }),
            shadowOffset:  { 
              width: 0,
              height: this.shadow.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 4]
              }),
            },
            shadowOpacity: this.shadow
          } 
        ]}
      >
        <QuoteTitle content={this.props.title} />

        <Text style={styles.legend}>"{this.props.content}"</Text>
      </AnimatedTouchable>
    );
  }
}