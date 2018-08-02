import React from 'react';
import { colors, padding } from '../assets/styles/base'


import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'native-base';



class ScanNextSteps extends React.Component {

  render () {
    const styles = StyleSheet.create( {
      popupContainer: {
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center', 
        backgroundColor: 'black',
        opacity: 0.5,
        paddingHorizontal: padding.md
      },
      popup: {
        backgroundColor: colors.deepBlue,
        height: 200,
        flex:1, 
        borderRadius: 16,
        paddingHorizontal: padding.int,
        paddingVertical: padding.sm
      }
    })


    return (
      <View style={styles.popupContainer}>
        <View style={styles.popup}>
          <Text>{this.props.uri}</Text>
          <Button primary>
            <Text>Create new note</Text>
          </Button>
          <Button primary>
            <Text>Update existing note</Text>
          </Button>
        </View>
      </View>
    )
  }
}




export default ScanNextSteps