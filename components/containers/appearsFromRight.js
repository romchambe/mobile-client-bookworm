import React, { Component } from "react";

import { Animated, View, Dimensions, StyleSheet } from 'react-native'

const appearsFromRight = WrappedComponent =>
  class FromRightHOC extends Component {
    state = {
      offset: new Animated.Value(1)
    }

    componentDidMount() {
      Animated.timing(this.state.offset, {
        toValue: 0,
        duration: 200
      }).start()
    }

    render() {
      const { width, height } = Dimensions.get('window')
    
      const styles = StyleSheet.create({
        container: {
          flex: 1,
        }
      })

      return (
        <Animated.View style={
          [styles.container, {
            transform: [{
              translateX: this.state.offset.interpolate({
                inputRange: [0, 1],
                outputRange: [0, width]
              })
            }] 
          }]
        }>
          <WrappedComponent {...this.props} />
        </Animated.View>
      )
    }
  }

export default appearsFromRight;