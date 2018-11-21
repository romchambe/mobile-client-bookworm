import React from 'react';


import { StyleSheet, View, Text, Dimensions, Animated } from 'react-native';
import * as base from './../../assets/styles/base';
import { connect } from 'react-redux';

class ErrorsContainer extends React.Component {
  height = new Animated.Value(0)

  componentWillUnmount(){
    Animated.timing(this.height, {
      toValue: 0,
      duration: 150
    }).start()
  }
  
  render () {
    if (this.props.errors.length > 0){
      Animated.timing(this.height, {
        toValue: Math.min(this.props.errors.length * 26,78),
        duration: 150
      }).start()  
    }
    

    const dimensions = {  
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width
    }

    const styles = StyleSheet.create({
      container: {
        position:'absolute',
        top:76,
        right: 0,
        left: 0,
        zIndex: 20,
        width: dimensions.width,
        backgroundColor: base.colors.red,
        overflow: 'scroll'
      }, 
      text:{
        flex:1, 
        flexDirection:'row',
        alignItems: 'center', 
        textAlign:'center', 
        fontFamily: 'cabin-bold',
        paddingVertical: 6,
        color: 'white',
        minHeight: 26,
        fontSize: base.fonts.sm
      },
    }) 

    if (this.props.errors.length === 0) { 
      return null 
    } else {
      return (      
        <Animated.View style={[styles.container, { height: this.height }]}>
            {
              this.props.errors.map(
                (error, index) => {return (<Text key={index} style={styles.text}>{error}</Text>)}
              )
            }
        </Animated.View>
      )  
    }
  }
}

function mapStateToProps(state){
  return {
    errors: state.errors
  }
}

export default connect(mapStateToProps)(ErrorsContainer)