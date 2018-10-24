import React from 'react';
import { colors, padding } from '../assets/styles/base'
import NotesCreator from './NotesCreator'
import NoteAccessor from './NoteAccessor'
import ForwardArrowIcon from './icons/ForwardArrowIcon'
import CustomTextArea from './CustomTextArea'
import SectionTitle from './SectionTitle'

import { View, StyleSheet, FlatList, TouchableOpacity, Animated, Dimensions, Easing } from 'react-native';


class ActionSelectionScreen extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      listDisplay: false,
      optionsPosition: new Animated.Value(0),
      listPosition: new Animated.Value(400), 
    }
    this.showList = this.showList.bind(this);
    this.showOptions = this.showOptions.bind(this);
  }

  showList(){
    this.setState({listDisplay: true})
    Animated.timing(this.state.listPosition, {
      toValue: 0,
      duration: 500,
    }).start()
  }

  showOptions () {
    this.setState({listDisplay: false})
    Animated.timing(this.state.optionsPosition, {
      toValue: 0,
      duration: 500,
    }).start()
  }


  render () {
    let {optionsPosition, listPosition} = this.state

    const hideOptions = () => {
      Animated.timing(optionsPosition, {
        toValue: 400,
        duration: 500,
      }).start(() => this.showList())
    } 
    
    const hideList = () => {
      Animated.timing(listPosition, {
        toValue: 400,
        duration: 500,
      }).start(() => this.showOptions())
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
        minHeight: 280
      },
    })

    

    return (
      <View style={styles.container}>
        <View style={styles.optionsContainer}>
          <Animated.View style={{ 
            display: this.state.listDisplay ? 'flex' : 'none',
            transform: [{translateX: listPosition}] 
          }}>
            <View style={styles.backToOptionsBar}> 
              <Text style={styles.backText} >Back to options </Text>
              <TouchableOpacity style={styles.toggle}  onPress={hideList} >
                
                <ForwardArrowIcon color={colors.deepBlue} />
              </TouchableOpacity>
            </View>
            <FlatList
              style={styles.list}
              data={this.props.notesList}
              renderItem={({item}) => <NoteAccessor key={item.key} title={item.title} onPress={() => this.props.addScanToNote(item.id)} />}
            />
          </Animated.View>
          <Animated.View style={{ 
            display: this.state.listDisplay ? 'none' : 'flex', 
            transform: [{translateX: optionsPosition}] 
          }}>
            <NotesCreator content='Create a new note' onPress={this.props.postCreateNote} />
            <NotesCreator content='Add to an existing note' onPress={hideOptions} />
          </Animated.View>
        </View>
        <View>
          <SectionTitle content='Preview of the scan' />

            <CustomTextArea rowSpan={6} value={this.props.response} />
    
        </View>
      </View>
    )
  }
}


export default ActionSelectionScreen