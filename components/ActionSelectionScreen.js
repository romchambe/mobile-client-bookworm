import React from 'react';
import { colors, padding } from '../assets/styles/base'
import NotesCreator from './NotesCreator'
import NoteAccessor from './NoteAccessor'
import UpArrowIcon from './icons/UpArrowIcon'
import CustomTextArea from './CustomTextArea'
import SectionTitle from './SectionTitle'

import { View, StyleSheet, FlatList, TouchableOpacity, Animated, Dimensions, Easing } from 'react-native';
import { Text, Button, Form } from 'native-base';



class ActionSelectionScreen extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      notesDisplay: false,
      upAnim: new Animated.Value(0),
      downAnim: new Animated.Value(-300), 
    }
  
  }





  render () {
    let {upAnim, downAnim} = this.state

    const showOptions = () => {
      Animated.parallel([
       Animated.timing(downAnim, {
          toValue: -300,

          duration: 500,
        }),
        Animated.sequence([
          Animated.delay(500),
          Animated.timing(upAnim, {
            toValue: 0,
            duration: 500,
          })
        ])
      ]).start()
    }
    const hideOptions = () => {
      Animated.parallel([
        Animated.timing(upAnim, {
          toValue: -300,
   
          duration: 500,
        }),
        Animated.sequence([
          Animated.delay(500),
          Animated.timing(downAnim, {
            toValue: 0,
            duration: 500,
          })
        ])
      ]).start()
    }

    const { height, width } = Dimensions.get('window');

    const styles = StyleSheet.create({
      container: {
        flex:1,
        flexDirection:'column',
        marginTop: padding.md 
      },
      backToOptionsBar:{
        flex: 1, 
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: padding.lg,
        marginBottom: padding.int,
        maxHeight: 50,
      },
      toggle:{
        height:50,
        width:50,
        borderRadius: 25,
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor: colors.lightBlue, 
        alignItems:'center', 
        marginRight: padding.int 
      },
      backText: {
        color: colors.lightBlue,
        fontFamily: 'cabin-bold'
      }, 
      list: {
        maxHeight: 200, 
        marginBottom: padding.int
      },
      optionsContainer:{
        flex: 0.8,
        
      },
      previewContainer: {
        flex: 0.2,
      }
    })

    

    return (
      <View style={styles.container}>
        <View style={styles.optionsContainer}>
          <Animated.View style={{ position:'absolute', left: 0, right: 0, top: downAnim }}>
            <View style={styles.backToOptionsBar}> 
              <Text style={styles.backText} >Back to options </Text>
              <TouchableOpacity style={styles.toggle}  onPress={showOptions} >
                
                <UpArrowIcon color={colors.deepBlue} />
              </TouchableOpacity>
            </View>
            <FlatList
              style={styles.list}
              data={this.props.notesList}
              renderItem={({item}) => <NoteAccessor key={item.key} title={item.title} onPress={() => this.props.addScanToNote(item.id)} />}
            />
          </Animated.View>
          <Animated.View style={{ transform: [{translateY: upAnim}] }}>
            <NotesCreator content='Create a new note' onPress={this.props.postCreateNote} />
            <NotesCreator content='Add to an existing note' onPress={hideOptions} />
          </Animated.View>
        </View>
        <View style={styles.previewContainer} >
          <SectionTitle content='Preview of the scan' />
          <Form>
            <CustomTextArea rowSpan={6} value={this.props.response} />
          </Form>
        </View>
      </View>
    )
  }
}


export default ActionSelectionScreen