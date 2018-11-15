import React, { Component } from "react";

import { Animated, View, Dimensions, PanResponder, StyleSheet } from 'react-native'

const swipeableComponent = WrappedComponent =>
  class swipeableHOC extends Component {
    
    offset = new Animated.Value(0)

    width = Dimensions.get('window').width
    
    _panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event([null, {dx: this.offset}]),
      onPanResponderRelease: (e, {vx, dx}) => {
     
        if (this.swipeMode(this.props.swipeMode, vx, dx)) {
          Animated.timing(this.offset, {
            toValue: dx > 0 ? this.width : - this.width,
            duration: 200
          }).start(() => this.onDismiss(dx > 0 ? -1 : 1));
        } else {
          Animated.spring(this.offset, {
            toValue: 0,
            bounciness: 10
          }).start();
        }
      }
    });
    componentWillUnmount(){
      console.log('unmount')
    }
    swipeMode(mode, vx, dx){
      return (mode === 0 && (Math.abs(vx) >= 0.5 || Math.abs(dx) >= 0.5 * this.width)) || 
      (mode === -1 && (vx <= - 0.5 || dx <= - 0.5 * this.width)) ||
      (mode === 1 && (vx >= 0.5 || dx >= 0.5 * this.width)) ? true :
      false
    }

    onDismiss(action){
      this.props.onDismiss(action)
      setTimeout(()=>{
        this.offset.setValue(0)
      }, 100)
    }

    render() {

    
      const styles = StyleSheet.create({
        container: {
          flex: 1,
        }
      })

      return (
      
        <Animated.View style={[
          styles.container, 
            {
              transform: [{
                translateX: this.offset
              }] 
            }
          ]}
        {...this._panResponder.panHandlers}
        >
          <WrappedComponent />
        </Animated.View>
      )
    }
  }

export default swipeableComponent;