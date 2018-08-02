import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default class CameraIcon extends React.Component {
  render() {
    return (
      <Ionicons name="ios-camera" size={36} color={this.props.color} style={{paddingTop:5}} />
    );
  }
}