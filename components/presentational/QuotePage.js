import React from 'react';
import * as base from './../../assets/styles/base';
import InputLegend from './InputLegend'
import InputField from './InputField'
import NotebookImage from './NotebookImage'
import MainButton from './MainButton'
import swipeableComponent from './../containers/swipeableComponent'

import { Animated, Easing, Keyboard, ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native';



class QuotePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      growBottom: new Animated.Value(0),
      spaced: false,
      quoteHeight: 26,
      titleHeight: 26,
    }

    this.registerScrollView = this.registerScrollView.bind(this)
    this.handleQuoteChanges = this.handleQuoteChanges.bind(this)
    this.handleTitleChanges = this.handleTitleChanges.bind(this)
    this.handleQuoteHeight = this.handleQuoteHeight.bind(this)
    this.handleTitleHeight = this.handleTitleHeight.bind(this)
    this.growBottom = this.growBottom.bind(this)
    this.scrollToInput = this.scrollToInput.bind(this)
  }

  maxQuoteHeight = 152
  maxTitleHeight = 88

  handleQuoteHeight(e){
    this.setState({ quoteHeight: Math.min(e.nativeEvent.contentSize.height, this.maxQuoteHeight)})
  }

  handleTitleHeight(e){
    this.setState({ titleHeight: Math.min(e.nativeEvent.contentSize.height, this.maxTitleHeight)})
  }

  handleQuoteChanges(e){
    this.setState({content: e})
  }

  handleTitleChanges(e){
    this.setState({title: e})
  }

  registerScrollView(component){
    this.scrollView = component
  }

  growBottom(){
    if (!this.state.spaced){
      Animated.timing(this.state.growBottom, {
        toValue: 248,
        duration: 250,
        easing: Easing.bezier(0.1, 0.76, 0.55, 0.9)
      }).start()
      this.setState({spaced: true})
    }
  }

  scrollToInput(){
    this.scrollView.scrollTo({x: 0, y: this.state.quoteHeight + 72, animated:true})
  }

  render() {

    const { width, height } = Dimensions.get('window')
    
    const styles = StyleSheet.create({
      container:{
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: base.padding.md,

      },
      scan: {
        width: width - 2 * base.padding.md,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: base.colors.altGrey,
        borderBottomWidth: 1, 

      },
      complete:{
        justifyContent: 'flex-start',
        minWidth: width - 2 * base.padding.md,
        paddingTop: base.padding.md, 
      },
      image:{  
        overflow: 'hidden',
      },
      prompt:{
        fontSize: base.fonts.md,
        color: base.colors.blue,
        fontFamily: 'cabin-semi-bold',
        alignSelf: 'center',
        overflow: 'hidden'
      },
      field: {  
        height: this.maxTitleHeight + 24
      }
    
    })

    const form = <ScrollView 
      contentContainerStyle={styles.complete} 
      ref={this.registerScrollView} 
      keyboardShouldPersistTaps={'always'}
    >    
      <Animated.Text style={[styles.prompt,
        {
          height: this.props.extracted ? 0 : this.state.growBottom.interpolate({
            inputRange: [0, 248],
            outputRange: [18, 0]
          }), 
          marginBottom: this.props.extracted ? 0 : this.state.growBottom.interpolate({
            inputRange: [0, 248],
            outputRange: [base.padding.md, 0]
          }),
        }
      ]}>
        Ou ajoutez-la vous-même!
      </Animated.Text>
      <View style={styles.field}>
        <InputLegend legend="Donnez un titre à votre citation pour mieux l'identifier" />
        <InputField 
          onFocus={() => { 
            if (!this.state.spaced) {
              this.growBottom()
            }
          }}
          onChangeText={this.handleTitleChanges} 
          handleHeightChange={this.handleTitleHeight} 
          handleChange={this.props.handleQuote}
          name='title'
          value={!!this.props.quote.title ? this.props.quote.title : null}
          maximumHeight={this.maxTitleHeight} 
          placeholder='Exemple: "Rencontre avec Kurtz"' 
        />
      </View>
      <InputLegend legend={ 
        this.props.extracted ? 
        "Editez le texte extrait si vous le souhaitez" : 
        "Saisissez le texte de votre citation"} 
      />
      <InputField 
        onFocus={() => {
          if (!this.state.spaced) {
            this.growBottom()
          }
          this.scrollToInput()
        }}
        onBlur={() => this.scrollView.scrollTo({x: 0, y: 0, animated:true})}
        onChangeText={this.handleQuoteChanges} 
        maximumHeight={this.maxQuoteHeight} 
        handleHeightChange={this.handleQuoteHeight} 
        handleChange={this.props.handleQuote}
        name='content'
        value={!!this.props.quote.content ? this.props.quote.content : null}
        placeholder="Exemple: 'On se mouvait mollement entre les ponts comme des poulpes au fond d'une baignoire d'eau fadasse'" 
      />
    </ScrollView>

    return this.props.extracted ? (
      <View style={styles.container}>
        {form}
      </View>
    ) : (
      <View style={styles.container}>
        <Animated.View style={[
          styles.scan, { 
            height: this.state.growBottom.interpolate({
              inputRange:[0, 248],
              outputRange: [180, 56]
            })
          } 
        ]}>
          <Animated.View style={[
            styles.image, {
              marginBottom: this.state.growBottom.interpolate({
                inputRange:[0, 248],
                outputRange: [base.padding.md, 0]
              }), 
              height: this.state.growBottom.interpolate({
                inputRange:[0, 248],
                outputRange: [100, 0]
              })
            }
          ]}>
            <NotebookImage height={100} width={112} />
          </Animated.View>
          <MainButton 
            height={40} 
            legend='Scannez une citation'
            onPress={
              this.props.goToScan
            }
          />
        </Animated.View>
        {form}
      </View>
    );
  }
}

export default swipeableComponent(QuotePage)
