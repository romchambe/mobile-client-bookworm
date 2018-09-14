import React from 'react';

import CustomFloatingLabel from './CustomFloatingLabel';
import CustomTextArea from './CustomTextArea';
import NotesCreator from './NotesCreator';
import AssetLoader from './AssetLoader';

import { Form, Button, Text } from 'native-base';
import { View, Image, StyleSheet } from 'react-native';
import { colors, padding } from './../assets/styles/base';

import { connect } from 'react-redux';


class NoteUpdateScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: props.note.title || '',
      book: props.note.book || '',
      content: props.note.content || ''
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBookChange = this.handleBookChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  handleTitleChange(e) {
    this.setState({title: e})
  }

  handleBookChange(e) {
    this.setState({book: e})
  }

  handleContentChange(e) {
    this.setState({content: e})
  }

  render () {
    const styles = StyleSheet.create({
      buttonContainer: {
        flex:1,
        flexDirection:'row',
        marginHorizontal: padding.int,
        marginVertical: padding.sm
      }, 
      textContainer: {
        marginVertical: padding.sm, 
        marginHorizontal: padding.int
      },
      button: {
        flex: 1,
        height:50,
        borderRadius: 25,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
      },
      text: {
        fontFamily: 'cabin-bold',

      }, 
      facebookText:{
        color:'#fff', fontFamily:'Helvetica', fontWeight: 'bold'
      },
      image: {
        width: 24, height: 24
      },
      facebookButton: {
        flex: 1,
        height:50,
        borderRadius: 25,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#3D5B98'
      }, 
    })

    const scanButton = <View style={styles.buttonContainer}>
      <Button style={styles.button} onPress={this.props.addScanToNote}>
        <Text style={styles.text}>Scan new contents for this note</Text>
      </Button>
    </View>

    return (
      <Form>
        <View style={{marginTop: 10}} >
          { this.props.scan ? null : scanButton }
          <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={() => this.props.putUpdateNote(this.state)}>
              <Text style={styles.text}>Save note</Text>
            </Button>
          </View>
          <CustomFloatingLabel 
            label="Note's title"
            onChangeText={this.handleTitleChange}
            value={this.state.title}
          />
          <CustomFloatingLabel 
            label="Book name (optional)"
            onChangeText={this.handleBookChange}
            value={this.state.book}
          />
          <CustomTextArea 
            rowSpan={this.props.scan ? 9 : 7} 
            value={this.state.content} 
            placeholder='The content of your note goes here' 
            onChangeText={this.handleContentChange}
          />
        </View>
      </Form>
    )
  }
}

export default NoteUpdateScreen

