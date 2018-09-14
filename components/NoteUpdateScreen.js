import React from 'react';

import CustomFloatingLabel from './CustomFloatingLabel';
import CustomTextArea from './CustomTextArea';
import NotesCreator from './NotesCreator'
import { Form, Button, Text } from 'native-base';
import { View, Image, StyleSheet } from 'react-native';
import { colors, padding } from './../assets/styles/base';
import { connect } from 'react-redux';
import * as sessionActions from './../redux-apis-bookworm/actions/sessionActions';
import { bindActionCreators } from 'redux';


class NoteUpdateScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title:'',
      book:'',
      content:''
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBookChange = this.handleBookChange.bind(this);
  }

  handleTitleChange(e) {
    this.setState({title: e})
  }

  handleBookChange(e) {
    this.setState({book: e})
  }

  render () {
    const styles = StyleSheet.create({
      buttonContainer: {
        flex:1,
        flexDirection:'row',

        marginHorizontal: padding.int,
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
    return (
      <Form>
        <View style={{marginTop: 30}} >
          { this.props.scan ? null : <NotesCreator content='Scan new contents for this note'/> }
          <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={() => this.props.putUpdateNote(this.state)}>
              <Text style={styles.text}>Save note</Text>
            </Button>
          </View>
          <CustomFloatingLabel 
            label="Note's title"
            onChangeText={this.handleTitleChange}
            value={this.props.note.title}
          />
          <CustomFloatingLabel 
            label="Book name (optional)"
            onChangeText={this.handleBookChange}
            secureTextEntry={true}
            value={this.props.note.book}
          />
          <CustomTextArea rowSpan={9} value={this.props.note.content} placeholder='The content of your note goes here' />
        </View>
      </Form>
    )
  }
}


export default NoteUpdateScreen

