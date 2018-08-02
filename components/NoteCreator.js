import React from 'react';
import { colors, padding } from '../assets/styles/base'
import PlusIcon from './icons/PlusIcon'

import { View } from 'react-native';
import { Text, Button, connectStyle } from 'native-base';



class NotesCreator extends React.Component {

  render () {
    const styles = this.props.style;
    return (
      <View style={styles.customSmPadding}>
        <Button style={styles.customCreator} onPress={this.props.onPress}> 
          <Text style={styles.customText}>Create a new note</Text>
          <PlusIcon color={colors.deepBlue}/>
        </Button>
      </View>
    )
  }
}

const styles = {
  customCreator: {
    flex: 1, 
    backgroundColor: colors.lightBlue,
    height:50,
    borderRadius: 25,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:5, 
    paddingRight:padding.int,
  }, 
  customSmPadding: {
    flex:1,
    flexDirection:'row',
    paddingVertical: padding.sm,
    marginHorizontal: padding.int,
    marginBottom: padding.sm
  },
  customText: {
    fontFamily:'cabin-bold'
  }
}



export default connectStyle('bookwormTheme.NotesCreator', styles)(NotesCreator)