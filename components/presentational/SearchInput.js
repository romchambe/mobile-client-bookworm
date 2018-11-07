import React from 'react';
import CustomIcon from './CustomIcon'

import * as base from './../../assets/styles/base';
import { View, TextInput, StyleSheet, Dimensions,  Animated } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default class SearchInput extends React.Component {
  opacityAnim = new Animated.Value(1)
  shadowAnim = new Animated.Value(1)
  
  render() {
    const dimensions = {  
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width
    }

    const onFocus = () => {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(this.opacityAnim, {
            toValue: 0.25, 
            duration: 20,
          }),

          Animated.timing(this.opacityAnim, {
            toValue: 1,
            duration: 200,
            delay:120
          })
        ]).start(),
        Animated.timing(this.shadowAnim, {
          toValue: 0.4,
          duration: 50
        })
      ]).start()
    }

    const onBlur = () => {
      Animated.timing(this.shadowAnim, {
        toValue: 1,
        duration: 50
      }).start()
    }

    const styles = StyleSheet.create({
      container:{
        flex: 1, 
        borderRadius: 4, 
        marginHorizontal: -4,
        backgroundColor: 'white'
      },
      shadowBox:{
        flex: 1,
        alignItems:'center',
      },
      search:{
        height: 40,
        width: dimensions.width - 40,
        paddingHorizontal: base.padding.lg,
        alignItems:'center',
        borderRadius: 4,
        backgroundColor: 'white',
        fontFamily: 'cabin',
        color: base.colors.blue,      
       
      },
      icon: {
        position: 'absolute',
        left:12,
        top: 10,
        zIndex: 2,
        color: base.colors.blueMedium
      }      
    });

    return (
      <View style={styles.container}>
        <Animated.View style={
          [styles.shadowBox, {
            opacity: this.opacityAnim,
            elevation: this.shadowAnim.interpolate({
              inputRange: [0.4, 1],
              outputRange: [0.4 * this.props.shadow.elevation, this.props.shadow.elevation]
            }),
            shadowColor: this.props.shadow.color,
            shadowRadius: this.shadowAnim.interpolate({
              inputRange: [0.4, 1],
              outputRange: [0.4 * this.props.shadow.radius, this.props.shadow.radius]
            }),
            shadowOffset:  { 
              width: this.shadowAnim.interpolate({
                inputRange: [0.4, 1],
                outputRange: [0.4 * this.props.shadow.offset.width, this.props.shadow.offset.width]
              }),
              height: this.shadowAnim.interpolate({
                inputRange: [0.4, 1],
                outputRange: [0.4 * this.props.shadow.offset.height, this.props.shadow.offset.height]
              }),
            },
            shadowOpacity: this.props.shadow.opacity
          }
        ]}>
          <MaterialCommunityIcons name="magnify" size={ 20 } style={styles.icon} />
          <TextInput 
            onChangeText={this.props.onChangeText}
            placeholder={this.props.placeholder}
            placeholderTextColor={base.colors.blueMedium}
            underlineColorAndroid="transparent"
            style={styles.search}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </Animated.View>
      </View>
    );
  }
}