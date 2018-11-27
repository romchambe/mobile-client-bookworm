import React from 'react';

import Book from './Book'
import SearchInput from './SearchInput'
import MainButton from './MainButton'
import ListSeparator from './ListSeparator'
import FilteredList from './FilteredList'

import { LinearGradient } from 'expo';

import * as base from './../../assets/styles/base';
import { View, Text, StyleSheet, Image, Dimensions, Animated, Keyboard, ScrollView, Easing} from 'react-native';



export default class BooksList extends React.Component {
  state = {
    search: "",
    keyboardAvoiding: new Animated.Value(180)
  }
  
  componentDidMount () {
    this._keyboardWillShow = this._keyboardWillShow.bind(this)
    this._keyboardWillHide = this._keyboardWillHide.bind(this)
    this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardWillHide(e){
    Animated.timing(this.state.keyboardAvoiding, {
      toValue: 180,
      duration: e.duration,
      easing: Easing.bezier(0.1, 0.76, 0.55, 0.9)
    }).start()
  }

  _keyboardWillShow(e){
    Animated.timing(this.state.keyboardAvoiding, {
      toValue: 80,
      duration: e.duration,
       easing: Easing.bezier(0.1, 0.76, 0.55, 0.9)
    }).start()
  }

  render() {
    const dimensions = {  
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width
    }

    const styles = StyleSheet.create({
      container:{
        flex: 1,
      },
     
      imageContainer:{
        position:'absolute',
        top: 0,
        left: 0,
        width: dimensions.width,
        height: 180,
        zIndex: 0
      },
      listContainer:{
        marginTop: 188,
        paddingHorizontal: base.padding.md,
        marginBottom: 80,
      },
      bottomActions:{
        position:'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor:'white'
      },
    });
   
    const searchHandler = (search) => {
      this.setState({search: search})
    }

    return (
      <View style={styles.container}>
        <Animated.View style={{ 
          position: 'absolute',
          height:40, 
          left: 20,
          right:20,
          zIndex: 10,
          top: this.state.keyboardAvoiding.interpolate({
            inputRange: [80, 180],
            outputRange: [20, 70],
          })
        }}>
          <SearchInput 
            placeholder="Chercher parmi vos livres" 
            onChangeText={(search) => searchHandler(search)} 
            shadow={{color: base.colors.black, opacity: 0.8, radius: 8, offset: {width: 0, height:4,}, elevation: 2}}
          />
        </Animated.View>

        <Animated.View style={{
          position: 'absolute',
          top: 0, 
          left: 0,
          zIndex: 5, 
          width: dimensions.width, 
          overflow: 'hidden',
          height: this.state.keyboardAvoiding
        }}>
          <Image
            style={styles.imageContainer}
            source={require('./../../assets/cover.jpg')}
          />
        </Animated.View>
        <ScrollView keyboardShouldPersistTaps={'always'}>
          <Animated.View style={[styles.listContainer, 
            {
              transform: [{
                translateY: this.state.keyboardAvoiding.interpolate({
                  inputRange: [80, 180],
                  outputRange: [-100, 0],
                })
              }]
            }
          ]}>
            <FilteredList 
              books={this.props.books} 
              search={this.state.search}
              goToBook={this.props.goToBook}
            />
          </Animated.View>
        </ScrollView>
        <Animated.View style={[styles.bottomActions, {
          transform: [{
            translateY: this.state.keyboardAvoiding.interpolate({
              inputRange: [80, 180],
              outputRange: [72, 0],
            })
          }]
        }]}>
          <MainButton height={40} legend="Nouveau Livre" onPress={this.props.newBook}/>
        </Animated.View>

      </View>

    );
  }
}