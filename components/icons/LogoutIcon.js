
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class PenIcon extends React.Component {
  render() {
    return (
      <MaterialCommunityIcons name="logout-variant" size={this.props.size} color={this.props.color} style={{paddingTop:5}} />
    );
  }
}