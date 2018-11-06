import React from 'react';


import * as base from './../../assets/styles/base';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BoxShadow } from 'react-native-shadow'

export default class Book extends React.Component {

  render() {
    const generateBadges = (count) => {
      let badges = [];
      let badgesCount = count > 5 ? 5 : count
      for (var i = 0; i < badgesCount; i++){
        badges.push(<View style={styles.badges} key={i} />)
      }
      return badges;
    }

    const dimensions = {  
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width
    }
    const shadowOpt = {

      width: dimensions.width - 56,
      height:88,
      color:base.colors.blueLight,
      border:10,
      radius:8,
      opacity:0.3,
      x:0,
      y:6,
      style: {position: 'relative', }
    }

    const styles = StyleSheet.create({
      container:{
        flex: 1,
        maxHeight:88,
        marginVertical: 8,
        marginHorizontal: 4,
        backgroundColor: 'white'
      },
      card: { 
        position: 'absolute',
        top: 0,
        left: 0,
        right:0,
        bottom:0,
        zIndex: 2,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        borderRadius: 8,
      },
      firstRow:{
        flex: 1,
        flexDirection: 'row',
        alignItems:'flex-end',
        justifyContent:'space-between',
        maxHeight: 48
      },
      secondRow:{
        flex: 1,
        flexDirection: 'row',
        alignItems:'flex-start',
        justifyContent:'space-between',
        maxHeight: 48
      },
      left:{
        paddingVertical: 6,
      },
      right:{
        width: 76,
        height: 48, 
        paddingVertical: 2,
        flexDirection: 'row',
        justifyContent: 'flex-end'
      },
      title:{
        color: base.colors.blue,
        fontFamily:'cabin-bold',
        fontSize: base.fonts.md,
      }, 
      badges:{
        height: 10, 
        width: 10,
        borderRadius:5,
        backgroundColor: base.colors.yellowMedium,
        alignSelf: 'flex-end',
        marginLeft:6,
        marginBottom:4
      },
      subtitle:{
        fontFamily: 'cabin',
        fontSize: base.fonts.sm,
        color: base.colors.blueLight
      }
    });

    return (
       
      <View style={styles.container}>
        <BoxShadow setting={shadowOpt}>
          <View style={styles.card}>
            <View style={styles.firstRow}>
              <View style={styles.left}>
                <Text style={styles.title} numberOfLines={1} > 
                  {this.props.book.title}
                </Text>
              </View>
            </View>
            <View style={styles.secondRow}>
              <View style={styles.left}>
                <Text style={styles.subtitle}> 
                  {this.props.book.author}
                </Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.subtitle}> 
                  {this.props.book.quoteCount > 5 ? '+ de 5 ' : this.props.book.quoteCount} citation{this.props.book.quoteCount <= 1 ? '' : 's'}
                </Text>
              </View>
            </View>
          </View>
        </BoxShadow>
      </View>

    );
  }
}