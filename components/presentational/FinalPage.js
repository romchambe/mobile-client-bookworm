import React from 'react';
import * as base from './../../assets/styles/base';

import SearchInput from './SearchInput'
import FilteredList from './FilteredList'
import PreviewText from './PreviewText'

import MainButton from './MainButton'

import { Animated, Easing, Keyboard, ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native';



export default class FinalPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      growBottom: new Animated.Value(0),
      keyboardAvoiding: new Animated.Value(0),
      spaced: false,
      search:''
    }
    this.registerScrollView = this.registerScrollView.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
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
      toValue: 0,
      duration: e.duration,
      easing: Easing.bezier(0.1, 0.76, 0.55, 0.9)
    }).start()
  }

  _keyboardWillShow(e){
    if (!this.state.spaced){
      Animated.timing(this.state.growBottom, {
        toValue: 248,
        duration: e.duration,
        easing: Easing.bezier(0.1, 0.76, 0.55, 0.9)
      }).start()
      this.setState({spaced: true})
    }

    Animated.timing(this.state.keyboardAvoiding, {
      toValue: 248,
      duration: e.duration,
      easing: Easing.bezier(0.1, 0.76, 0.55, 0.9)
    }).start()
  }

  handleSearch(e){
    this.setState({search: e})
  }


  registerScrollView(component){
    this.scrollView = component
  }

  render() {
    const { width, height } = Dimensions.get('window')
    
    const styles = StyleSheet.create({
      container:{

        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: base.padding.md,
        width: width
      },
      newBook: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: base.colors.altGrey,
        borderBottomWidth: 1, 
        marginHorizontal: base.padding.md,
        overflow:'hidden', 

      },
      chooseBook:{
       flexGrow: 1,
        paddingHorizontal: base.padding.md,
        justifyContent: 'flex-start',
        paddingTop: 16,
        minWidth: width,
      },
      previewContainer: {
        maxHeight: 80,
        overflow: 'hidden',
        marginBottom: base.padding.xs
      },
      prompt:{  
        fontSize: base.fonts.md,
        color: base.colors.blue,
        fontFamily: 'cabin-semi-bold',
        alignSelf: 'center',
        overflow: 'hidden'
      },
      bottomActions:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right:0,
        paddingHorizontal: 20,
        paddingBottom: 16,
        paddingTop: base.padding.xs,
        height:72,
        justifyContent:'center',
        alignItems:'center'
      },
      searchContainer: {
        width: width - 40, height: 40
      }
    })

    let quote = !!this.props.extracted ? this.props.extracted.response : null

    return (
      <View style={styles.container}>

        <Animated.View style={[styles.newBook,
          {
            height: this.state.keyboardAvoiding.interpolate({
              inputRange:[0, 248],
              outputRange: [this.state.spaced ? 56 : 144, 0]
            }),
            paddingBottom: this.state.keyboardAvoiding.interpolate({
              inputRange:[0, 248],
              outputRange: [16, 0]
            }),
          }
        ]}>
          <Animated.View style={[
            styles.previewContainer, { 
              height: this.state.growBottom.interpolate({
                inputRange:[0, 248],
                outputRange: [80, 0]
              })
            } 
          ]}>
            <PreviewText maxHeight={80} text={quote} />
          </Animated.View>
          <MainButton height={40} legend='Nouveau livre' />
        </Animated.View>
        
        <ScrollView contentContainerStyle={styles.chooseBook} ref={this.registerScrollView}>
          <Animated.Text style={[styles.prompt,
            {
              height: this.state.growBottom.interpolate({
                inputRange: [0, 248],
                outputRange: [18, 0]
              }), 
              marginBottom: this.state.growBottom.interpolate({
                inputRange: [0, 248],
                outputRange: [base.padding.md, 0]
              }),
            }
          ]}>
            Ou ajoutez-la à l'un de vos livres!
          </Animated.Text>

          <FilteredList 
            books={this.props.books}
            search={this.state.search} 
          />
        </ScrollView>
        <View style={styles.bottomActions}>
          <Animated.View style={[styles.searchContainer,
            {
              transform: [{
                translateY: this.state.keyboardAvoiding.interpolate({
                  inputRange: [0,248],
                  outputRange:[0, - 260]
                })
              }]
            }
          ]}>
            <SearchInput 
              placeholder="Chercher parmi vos livres" 
              onChangeText={this.handleSearch} 
              shadow={{color: base.colors.blue, opacity: 1, radius: 3, offset: {width: 0, height:2,}, elevation: 1}}
            />
          </Animated.View>
        </View>
      </View>
    );
  }
}