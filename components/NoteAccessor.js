import React from 'react';

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import createStyles from './../assets/styles/base';
import { padding, colors } from './../assets/styles/base';
import PenIcon from'./icons/PenIcon';
import { Text } from 'native-base';


class NoteAccessor extends React.Component {

  render () {
    const styles = createStyles({
      text:{
        flex:1,
        color: colors.deepBlue, 
        fontFamily:'cabin-bold'
      }, 
      container:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        height:50,
        borderRadius:6,
        marginVertical: padding.sm, 
        marginHorizontal: padding.int,
        paddingLeft: padding.md, 
        paddingRight: padding.int,
        backgroundColor: colors.orange
      }
    })
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress} >
        <Text style={ styles.text }>
          {this.props.title}
        </Text>
        <PenIcon color={colors.deepBlue} />
      </TouchableOpacity>
    )
  }
}


export default NoteAccessor