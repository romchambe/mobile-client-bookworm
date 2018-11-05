import React from 'react';


import * as base from './../../assets/styles/base';
import { View, Text, StyleSheet, Dimensions } from 'react-native';


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

    const styles = StyleSheet.create({
      container:{
        flex: 1,
        maxHeight:80,
        borderBottomColor: base.colors.blueLight,
        borderBottomWidth: this.props.last ? 0 : 2
      },
    
      firstRow:{
        flex: 1,
        flexDirection: 'row',
        alignItems:'flex-end',
        justifyContent:'space-between',
        maxHeight: 40
      },
      secondRow:{
        flex: 1,
        flexDirection: 'row',
        alignItems:'flex-start',
        justifyContent:'space-between',
        maxHeight: 40
      },
      left:{
        paddingVertical: 2,
      },
      right:{
        width: 76,
        height: 40, 
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
        fontFamily: 'cabin-italic',
        fontSize: base.fonts.sm,
        color: base.colors.black
      }
    });

    return (
      <View style={styles.container}>

        <View style={styles.firstRow}>
          <View style={styles.left}>
            <Text style={styles.title} numberOfLines={1} > 
              {this.props.book.title}
            </Text>
          </View>
          <View style={styles.right}>
            {
              generateBadges(this.props.book.quoteCount)
            }
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
    );
  }
}