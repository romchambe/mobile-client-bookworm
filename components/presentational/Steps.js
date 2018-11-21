import React from 'react';
import * as base from './../../assets/styles/base';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

export default class Badge extends React.Component {
  render() {
    const { width, height } =Dimensions.get('window')

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 8
      },
      step:{
        flex: 1,
        maxHeight: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: base.colors.blueLight,
        borderBottomWidth: 3, 
      },
      stepHint:{
        fontFamily: 'cabin-bold',
        fontSize: 12,
      },
    })

    const steps = this.props.steps.map((step, index) => {
      return (
        <View key={index} style={styles.step}>
          <Text style={[
            styles.stepHint, 
            { color: index === this.props.activeIndex ? base.colors.blue : base.colors.blueLight }
          ]}> {step} </Text>
        </View>
      )}
    )
    return (

      <View style={styles.container}>
        {steps}        
      </View>
    );
  }
}