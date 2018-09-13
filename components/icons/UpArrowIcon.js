import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default class UpArrowIcon extends React.Component {
  render() {
    return (
      <Ionicons name="ios-arrow-up-outline" size={24} color={this.props.color} style={{paddingTop:5}} />
    );
  }
}