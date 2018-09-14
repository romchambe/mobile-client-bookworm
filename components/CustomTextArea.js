import React from 'react';
import { colors, padding } from '../assets/styles/base'

import { Textarea, connectStyle } from 'native-base';


class CustomTextArea extends React.Component {

  render () {
    const styles = this.props.style;
    return (
      <Textarea 
        rowSpan={this.props.rowSpan} 
        placeholder={this.props.placeholder} 
        placeholderTextColor={colors.lightYellow} 
        onChangeText={this.props.onChangeText}
        style={styles.textArea} 
        value={this.props.value}
        disabled={this.props.disabled ? true : false}
      />
    )
  }
}

const styles = {
  textArea: {
    flex: 1, 
    backgroundColor: colors.deepblue,
    borderRadius:6,
    borderColor: colors.yellow, 
    borderWidth: 2,
    alignItems:'center',
    color: colors.yellow,
    fontFamily: 'cabin-bold', 
    marginTop: padding.int, 
    marginHorizontal: padding.int,
  }
}



export default connectStyle('bookwormTheme.CustomTextArea', styles)(CustomTextArea)