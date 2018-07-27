import React from 'react';

import { View, StyleSheet } from 'react-native';
import createStyles from './../assets/styles/base';
import { padding, colors } from './../assets/styles/base';
import PenIcon from'./PenIcon';
import { Text } from 'native-base';


class NoteAccessor extends React.Component {

  render () {
    const styles = createStyles({
      text:{
        flex:1,
        color: colors.deepBlue
      }, 
      container:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        height:50,
        borderRadius:4,
        marginVertical: padding.sm, 
        marginHorizontal: padding.int,
        paddingLeft: padding.md, 
        paddingRight: padding.int,
        backgroundColor: colors.altOrange
      }
    })
    return (
      <View style={ styles.container }>
        <Text style={ styles.text }>
          {this.props.title}
        </Text>
        <PenIcon color={colors.deepBlue} />
      </View>
    )
  }
}


export default NoteAccessor