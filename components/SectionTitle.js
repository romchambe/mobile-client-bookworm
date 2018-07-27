import React from 'react';

import { View, StyleSheet } from 'react-native';
import createStyles from './../assets/styles/base';
import { padding } from './../assets/styles/base';
import { Text } from 'native-base';


class TagLine extends React.Component {

  render () {
    const styles = createStyles({
      text:{
        fontFamily:'cabin-bold', 
      }, 
      container:{
        paddingVertical: padding.sm,
        paddingHorizontal: padding.lg
      }
    })

    return (
      <View style= { styles.container }>
        <Text style={ styles.text }>
          {this.props.content}
        </Text>
      </View>
    )
  }
}


export default TagLine