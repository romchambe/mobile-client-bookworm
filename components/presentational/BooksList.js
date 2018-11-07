import React from 'react';

import Book from './Book'
import SearchInput from './SearchInput'
import ListSeparator from './ListSeparator'

import * as base from './../../assets/styles/base';
import { View, Text, StyleSheet, Image, Dimensions, Animated, Keyboard} from 'react-native';

const FilteredList = (props) => {
  let escapePunctuation = /[^A-Za-z0-9_]/g

  let list = props.books.filter(
    book => (book.title.replace(escapePunctuation,"").match(new RegExp(props.search.replace(escapePunctuation, ""), "i")) ||
      book.author.replace(escapePunctuation,"").match(new RegExp(props.search.replace(escapePunctuation, ""), "i")))
  ).map((filteredBook, index) => { 
    return <Book book={filteredBook} key={index} />
  })

  const dimensions = {  
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  }

  const styles = StyleSheet.create({
    listContainer:{
      minHeight: dimensions.height,
      flex:1,
      justifyContent:'flex-start',
      marginTop:188,
    }
  })

  
  return (
    <View style={styles.listContainer}>
      {list}
    </View>
  )
}


export default class BooksList extends React.Component {
  state = {search: ""}
  keyboardAvoiding = new Animated.Value(180)
    
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

  _keyboardWillHide(){
    Animated.timing(this.keyboardAvoiding, {
      toValue: 180,
      duration: 100
    }).start()
  }

  _keyboardWillShow(){
    Animated.timing(this.keyboardAvoiding, {
      toValue: 80,
      duration: 100
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
    });
   
    const searchHandler = (search) => {
      this.setState({search: search})
    }

    return (
      <View style={styles.container}>
        <Animated.View style={{ 
          position: 'absolute',
          zIndex: 10,
          top: this.keyboardAvoiding.interpolate({
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
          marginHorizontal: - base.padding.md, 
          width: dimensions.width, 
          overflow: 'hidden',
          height: this.keyboardAvoiding
        }}>
          <Image
            style={styles.imageContainer}
            source={require('./../../assets/cover.jpg')}
          />
        </Animated.View>
        
        <Animated.View style={{
          transform: [{
            translateY: this.keyboardAvoiding.interpolate({
              inputRange: [80, 180],
              outputRange: [-100, 0],
            })
          }]
        }}>
          <FilteredList books={this.props.books} search={this.state.search}/>
        </Animated.View>

      </View>

    );
  }
}