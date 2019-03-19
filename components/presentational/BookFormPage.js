import React from 'react';
import * as base from './../../assets/styles/base';
import InputLegend from './InputLegend'
import InputField from './InputField'
import MainButton from './MainButton'
import QuotePage from './QuotePage'

const michel = 1

import {  ScrollView, View, Text, StyleSheet, Animated } from 'react-native';

export default class BookFormPage extends React.Component {
  constructor(props){
    super(props) 
    this.state = {
      titleHeight: 26
    }
    this.scrollToInput = this.scrollToInput.bind(this)
    this.handleTitleHeight = this.handleTitleHeight.bind(this)
    this.registerScrollView = this.registerScrollView.bind(this)
  }

  registerScrollView(component){
    this.scrollView = component
  }

  scrollToInput(){
    this.scrollView.scrollTo({x: 0, y: this.state.titleHeight + 80, animated:true})
  }

  handleTitleHeight(e){
    this.setState({ titleHeight: Math.min(e.nativeEvent.contentSize.height, this.maxTitleHeight)})
  }

  maxTitleHeight = 88
  maxQuoteHeight = 200

  render() {
    const styles = StyleSheet.create({
      container:{
        flex:1,
        justifyContent: 'flex-start',
        paddingTop: base.padding.md
      },
      margin:{
        marginBottom: base.padding.md 
      },
      contentContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: base.padding.md
      },
      quoteContainer:{
        justifyContent: 'flex-start',
      },
      bottomActions:{
        position:'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 72,
        alignItems: 'center',
        paddingTop: base.padding.xs,
        paddingBottom: base.padding.md,
        backgroundColor: 'white'
      }
    })

 
    return this.props.form === 'quote'|| this.props.form === 'comment' ? (
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.contentContainer} 
          ref={this.registerScrollView} 
          keyboardShouldPersistTaps={'always'}
        >
          <View style={styles.container}>
            {
              this.props.form === 'quote' ? (
                <View style={styles.margin}>
                  <InputLegend legend='Titre de la citation' />  
                  <InputField 
                    placeholder='Il vous permet de repérer plus vite votre citation' 
                    name='title' 
                    handleChange={this.props.handleForm}
                    handleHeightChange={this.handleTitleHeight} 
                    maximumHeight={this.maxTitleHeight}  
                    value={this.props.item.title}
                  />
                </View>
              ) : null
            }
            
            <View style={styles.margin} />
            <InputLegend legend="Contenu" />
            <InputField 
              placeholder="Votre citation" 
              name='content' 
              onBlur={() => this.scrollView.scrollTo({x: 0, y: 0, animated:true})}
              onFocus={() => this.scrollToInput()}
              maximumHeight={this.maxQuoteHeight}
              handleChange={this.props.handleForm}
              value={this.props.item.content}
            />
          </View>
        </ScrollView>
        <View style={styles.bottomActions}>
          <MainButton height={40} legend="Sauvegarder" onPress={this.props.handleSubmit}/>
        </View>
      </View>
    ) : (
      <QuotePage 
        swipeMode={1} 
        onDismiss={this.props.backAndClean}
        quote={this.props.item}
        goToScan={this.props.goToScan}
      />
    )
  }
}
