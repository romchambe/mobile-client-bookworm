import React from 'react';
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default class FlipCameraIcon extends React.Component {
  render() {
    return (
      <Feather name="list" size={16} color={this.props.color} style={{paddingTop: Platform.OS === 'ios' ? 0 : 3}} />
    );
  }
}