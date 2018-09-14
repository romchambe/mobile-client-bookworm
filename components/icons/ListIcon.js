import React from 'react';
import { Feather } from '@expo/vector-icons';

export default class FlipCameraIcon extends React.Component {
  render() {
    return (
      <Feather name="list" size={16} color={this.props.color} style={{paddingTop:5}} />
    );
  }
}