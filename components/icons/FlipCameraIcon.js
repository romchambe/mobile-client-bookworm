import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default class FlipCameraIcon extends React.Component {
  render() {
    return (
      <Ionicons name="md-reverse-camera" size={28} color={this.props.color} style={{paddingTop:5}} />
    );
  }
}