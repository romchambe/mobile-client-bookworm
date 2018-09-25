import React from 'react';
import { Platform } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default class PlusIcon extends React.Component {
  render() {
    return (
      <Entypo name="plus" size={28} color={this.props.color} style={{paddingTop:Platform.OS === 'ios'? 5 : 0}} />
    );
  }
}