import React from 'react';
import * as base from './../../assets/styles/base';
import CustomIcon from './CustomIcon'
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

export default class Comment extends React.Component {
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
      container: {
        flex: 1,
        flexDirection:'row',
        alignItems: 'flex-start',
        marginTop: base.padding.xs,
        borderRadius: 4,
        marginHorizontal: 16,
        padding: base.padding.xs,
        backgroundColor: 'white',
        shadowColor: base.colors.blueLight,
      },
      iconContainer:{
        width: 32,
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
      <AnimatedTouchable 
        disabled={this.props.disabled} 
        onPress={() => this.props.onPress({id: this.props.id, type: 'comment', quoteId: this.props.quoteId})}
        style={[
          styles.container,
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
        <View style={styles.iconContainer}>
          <CustomIcon name="comment" dimension={24}/>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.legend}>{this.props.content}</Text>
        </View>
      </AnimatedTouchable>
    );
  }
}