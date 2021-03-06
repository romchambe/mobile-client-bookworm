import React from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AssetLoader from '../AssetLoader'
import EmptyBooksList from '../presentational/EmptyBooksList'
import BooksList from '../presentational/BooksList'
import appearsFromRight from './appearsFromRight'

import * as bookActions from '../../core-modules/actions/bookActions'
import * as navigationActions from '../../core-modules/actions/navigationActions'
import * as flowActions from '../../core-modules/actions/flowActions'

class BooksContainer extends React.Component {
  constructor(props) {
    super(props)
    this.navigateToNew = this.navigateToNew.bind(this)
    this.navigateToBook = this.navigateToBook.bind(this)
  }

  componentDidMount() {
    this.props.actions.cleanFlow()
    this.props.actions.readBooksIndex({ jwt: this.props.jwt }, 'mobile')
  }

  navigateToBook(payload) {
    this.props.actions.navigateToEdit(payload)
  }

  navigateToNew() {
    this.props.actions.navigateToNew()
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
    })

    const content = this.props.fetching ? <AssetLoader />
      : this.props.books.booksList.length > 0
        ? <BooksList books={this.props.books.booksList} newBook={this.navigateToNew} goToBook={this.navigateToBook} />
        : <EmptyBooksList newBook={this.navigateToNew} />

    return (
      <View style={styles.container}>
        { content }
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    jwt: state.session.jwt,
    books: state.books,
    fetching: state.fetching,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, bookActions, navigationActions, flowActions), dispatch),
  }
}

export default appearsFromRight(connect(mapStateToProps, mapDispatchToProps)(BooksContainer))
