import React from 'react';
import createStyles from './../assets/styles/base.js';
import { View } from 'react-native';
import { Text } from 'native-base';


class About extends React.Component {

  render () {
    const styles = createStyles()
    return (
      <View style={{flex: 1, flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"}}>
        <Text>
          Scan a book, a screen, a graffiti with your phone, extract the text and keep note of it!
        </Text>
      </View> 
    )
  }
}


export default About