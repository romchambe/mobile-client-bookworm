import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class PenIcon extends React.Component {
  render() {
    return (
      <MaterialCommunityIcons name="pen" size={28} color={this.props.color} style={{paddingTop:5}} />
    );
  }
}