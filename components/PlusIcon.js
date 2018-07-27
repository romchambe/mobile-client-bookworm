import React from 'react';
import { Entypo } from '@expo/vector-icons';

export default class PlusIcon extends React.Component {
  render() {
    return (
      <Entypo name="plus" size={28} color={this.props.color} style={{paddingTop:5}} />
    );
  }
}