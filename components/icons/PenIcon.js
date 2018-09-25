import React from 'react';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class PenIcon extends React.Component {
  render() {
    return (
      <MaterialCommunityIcons name="pen" size={28} color={this.props.color} style={{paddingTop:Platform.OS === 'ios'? 5 : 0}} />
    );
  }
}

