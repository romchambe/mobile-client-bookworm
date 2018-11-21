import React from 'react';

import appearsFromRight from './appearsFromRight'

import * as base from './../../assets/styles/base';

import * as bookActions from './../../core-modules/actions/bookActions'
import * as flowActions from './../../core-modules/actions/flowActions'

import { View, Text, Dimensions, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

class BookEditContainer extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.actions.startFlow()
    this.props.actions.readBook({
      jwt: this.props.jwt, 
      id: this.props.match.params.id
    }, 'mobile')
  }
 
  componentWillUnmount(){
    this.props.actions.cleanFlow()
  }


  render () {
    const { width, height } = Dimensions.get('window')
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: base.padding.lg
      }
    })

   

    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.props.book)}</Text>
      </View>
    )
  }
}

function mapStateToProps(state){
  return {
    jwt: state.session.jwt,
    book: state.books.currentBook
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({}, bookActions, flowActions), dispatch)
  }
}
export default appearsFromRight(connect(mapStateToProps, mapDispatchToProps)(BookEditContainer))