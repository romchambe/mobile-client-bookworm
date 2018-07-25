import React from 'react';
import { colors } from '../assets/styles/base'
import PlusIcon from './PlusIcon'

import { View } from 'react-native';
import { Text, Button, connectStyle } from 'native-base';



class NotesCreator extends React.Component {

  render () {
    const styles = this.props.style;
    return (
      <View style={styles.customSmPadding}>
        <Button style={styles.customCreator}> 
          <Text>Create a new note</Text>
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
    height:60,
    borderRadius: 16,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:5, 
    paddingRight:15
  }, 
  customSmPadding: {
    flex:1,
    flexDirection:'row',
    paddingVertical: 10,
  }
}



export default connectStyle('bookwormTheme.NotesCreator', styles)(NotesCreator)