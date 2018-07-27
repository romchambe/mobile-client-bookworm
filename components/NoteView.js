import React from 'react';

import { View, StyleSheet } from 'react-native';
import createStyles from './../assets/styles/base';
import { padding } from './../assets/styles/base';
import { Text } from 'native-base';


class NoteView extends React.Component {

  render () {
    const styles = createStyles({
      centered:{
        textAlign:'center',
        fontFamily: 'cabin-bold-italic'
      }, 
      verticalPadding:{
        paddingVertical: padding.md
      }
    })
    return (
      <View style= {styles.verticalPadding}>
        <Text style={ styles.centered }>
          Note View
        </Text>
      </View>
    )
  }
}


export default NoteView