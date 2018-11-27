import React from 'react';
import * as base from './../../assets/styles/base';
import InputLegend from './InputLegend'
import InputField from './InputField'
import MainButton from './MainButton'
import QuotePage from './QuotePage'



import {  ScrollView, View, Text, StyleSheet, Animated } from 'react-native';

export default class BookFormPage extends React.Component {
  constructor(props){
    super(props) 
  }

  render() {
    const styles = StyleSheet.create({
      container:{
        flex:1,
        justifyContent: 'flex-start',
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

 
    return this.props.form === 'edit' ? (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps={'always'}>
          <View style={styles.container}>
            {
              this.props.payload.type === 'quote' ? (
                <View style={styles.margin}>
                  <InputLegend legend='Titre de la citation' />  
                  <InputField 
                    placeholder='Il vous permet de repérer plus vite votre citation' 
                    name='title' 
                    handleChange={this.props.handleForm} 
                    value={this.props.payload.content.title}
                  />
                </View>
              ) : null
            }
            
            <View style={styles.margin} />
            <InputLegend legend="Contenu" />
            <InputField 
              placeholder="Votre citation" 
              name='content' 
              handleChange={this.props.handleForm}
              value={this.props.payload.content.content}
            />
          </View>
        </ScrollView>
        <View style={styles.bottomActions}>
          <MainButton height={40} legend="Sauvegarder" onPress={this.props.handleSubmit}/>
        </View>
      </View>
    ) : (
      <QuotePage 
        swipeMode={-1} 
        onDismiss={this.props.goToStep}
        quote={this.props.quote}
      />
    )
  }
}
