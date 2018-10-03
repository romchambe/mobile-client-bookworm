import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default class ForwardArrowIcon extends React.Component {
  render() {
    return (
      <Ionicons name="ios-arrow-forward-outline" size={24} color={this.props.color} style={{paddingTop:5}} />
    );
  }
}