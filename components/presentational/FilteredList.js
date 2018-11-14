import React from 'react'
import { View, Text, StyleSheet, Dimensions} from 'react-native'
import Book from './Book'
import * as base from './../../assets/styles/base';

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
      minHeight: dimensions.height - 264,
      flex: 1,
      justifyContent:'flex-start',
    },
    noMatch:{
      flex: 1,
      alignItems:'center',
      textAlign: 'center',
      marginTop: base.padding.md,
      fontFamily: 'cabin-italic',
      color: base.colors.black,
    }
  })

  return (
    <View style={styles.listContainer}>
      {list.length > 0 ? list : <Text style={styles.noMatch}>Aucun titre ou auteur ne correspond à votre recherche</Text>}
    </View>
  )
}

export default FilteredList