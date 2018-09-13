import React from 'react';
import { colors, padding } from '../assets/styles/base'

import { Item, Label, Input, connectStyle } from 'native-base';


class CustomFloatingLabel extends React.Component {

  render () {
    const styles = this.props.style;
    return (
      <Item floatingLabel style={styles.item}>
        <Label style={styles.label}>{this.props.label}</Label>
        <Input 
          style={styles.input} 
          onChangeText={this.props.onChangeText} 
          secureTextEntry={ this.props.secureTextEntry ? true : false }
        />
      </Item>
    )
  }
}

const styles = {
  item: {
    flex: 1,
    marginTop: padding.int,
    marginHorizontal: padding.int,
    borderBottomWidth:2
  }, 
  label: {
    fontFamily: 'cabin-bold', 
    fontSize: 15
  },
  input: {
    fontFamily: 'cabin-bold', 
    fontSize: 15
  }
}



export default connectStyle('bookwormTheme.CustomFloatingLabel', styles)(CustomFloatingLabel)