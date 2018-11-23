import React from 'react';


import * as base from './../../assets/styles/base';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';


export default class Book extends React.Component {
  constructor(props){
    super(props)
    this.goToBook = this.goToBook.bind(this)
  }

  goToBook(){
    this.props.onPress(this.props.id)
  }


  render() {

    const dimensions = {  
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width
    }
  

    const styles = StyleSheet.create({
      container:{
        flex: 1,
        maxHeight:88,
        marginVertical: 8,
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
        elevation: 1,
        shadowColor: base.colors.blueLight,
        shadowRadius: 6,
        shadowOffset:  { 
          width: 0,
          height: 4,
        },
        shadowOpacity: 1
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
        height: 44, 
        paddingVertical: 6,
        flexDirection: 'row',
        justifyContent: 'flex-end'
      },
      title:{
        color: base.colors.blue,
        fontFamily:'cabin-bold',
        fontSize: base.fonts.md,
      }, 
      badge:{
        height: 24, 
        width: 24,
        borderRadius:12,
        backgroundColor: base.colors.blueLight,
        justifyContent: 'center',
        alignItems:'center',
        marginTop: -4

      },
      badgeText:{
        fontFamily: 'cabin-bold',
        fontSize: base.fonts.sm, 
        color: 'white',
        paddingLeft: 1
      },
      subtitle:{
        fontFamily: 'cabin',
        fontSize: base.fonts.sm,
        color: base.colors.blueLight,
        marginRight: 8,
      }
    });

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.card} onPress={this.goToBook}>
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
                Citations: 
              </Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {this.props.book.quote_count}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

    );
  }
}