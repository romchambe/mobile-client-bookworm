import React from 'react'
import { Dimensions, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AssetLoader from '../AssetLoader'
import appearsFromRight from './appearsFromRight'
import BookHomePage from '../presentational/BookHomePage'
import BookFormPage from '../presentational/BookFormPage'

import * as bookActions from '../../core-modules/actions/bookActions'
import * as flowActions from '../../core-modules/actions/flowActions'
import * as quoteActions from '../../core-modules/actions/quoteActions'
import * as navigationActions from '../../core-modules/actions/navigationActions'

class BookEditContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: '',
      quote: {},
      comment: {},
      extracted: false,
      stepOffset: new Animated.Value(0),
    }

    this.goToStep = this.goToStep.bind(this)
    this.backAndClean = this.backAndClean.bind(this)

    this.handleItemForEdit = this.handleItemForEdit.bind(this)
    this.handleQuote = this.handleQuote.bind(this)
    this.handleComment = this.handleComment.bind(this)

    this.goToNew = this.goToNew.bind(this)
    this.submitEdit = this.submitEdit.bind(this)
    this.submitNew = this.submitNew.bind(this)
  }

  componentDidMount() {
    this.origin = this.props.flow.from
    this.props.actions.startFlow({ from: 'edit' })

    if (this.origin === 'scan' && !!this.props.flow.payload.response) {
      this.props.actions.createQuote({
        jwt: this.props.jwt,
        quote: {
          book_id: this.props.match.params.id,
          content: this.props.flow.payload.response,
          title: 'Citation',
        },
      }, 'mobile')
    }

    this.props.actions.readBook({
      jwt: this.props.jwt,
      id: this.props.match.params.id,
    }, 'mobile')
  }

  componentWillUnmount() {
    this.props.actions.transmitData({
      payload: {
        id: this.props.match.params.id,
      },
    })
    this.props.actions.cleanCurrentBook()
  }

  handleItemForEdit(item) {
    if (item.type === 'quote') {
      this.setState({
        form: 'quote',
        quote: this.props.book.quotes.find(quote => quote.quote.id === item.id).quote,
      })
    } else if (item.type === 'comment') {
      this.setState({
        form: 'comment',
        comment: this.props.book.quotes.find(quote => quote.quote.id === item.quoteId)
          .comments.find(comment => comment.id === item.id),
      })
    }
    this.goToStep(1)
  }

  backAndClean(action) {
    this.setState({
      form: '',
      quote: {},
      comment: {},
    })
    this.goToStep(action)
  }

  goToStep(action) {
    Animated.timing(this.state.stepOffset, {
      toValue: this.props.flow.step + action,
      duration: 200,
    }).start(
      () => this.props.actions.updateFlow({
        next: action,
        title: this.state.form === 'new'
          ? 'Nouvelle citation'
          : this.state.form === 'quote'
            ? 'Modifier la citation'
            : this.state.form === 'comment'
              ? 'Modifier le commentaire'
              : this.props.book.book.title,
        back: () => { this.backAndClean(-1) },
      }),
    )
  }

  handleQuote(payload) {
    this.setState(
      (prevState, props) => ({
        quote: Object.assign({}, prevState.quote, payload),
      }),
    )
  }

  handleComment(payload) {
    this.setState(
      (prevState, props) => ({
        comment: Object.assign({}, prevState.comment, payload),
      }),
    )
  }

  submitEdit() {
    this.props.actions.updateDependents({
      jwt: this.props.jwt,
      edit: this.state.form === 'quote'
        ? {
          type: 'quote',
          quote: this.state.quote,
        }
        : this.state.form === 'comment'
          ? {
            type: 'comment',
            comment: this.state.comment,
          }
          : null
    }, 'mobile').then(
      () => {
        this.props.actions.readBook({
          jwt: this.props.jwt,
          id: this.props.match.params.id,
        }, 'mobile').then(() => { this.backAndClean(-1) })
      },
    )
  }

  goToNew() {
    this.setState({ form: 'new' })
    this.goToStep(1)
  }

  submitNew() {
    this.props.actions.createQuote({
      jwt: this.props.jwt,
      quote: this.state.quote,
    }, 'mobile')
  }

  render() {
    const { width, height } = Dimensions.get('window')

    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      inputView: {
        position: 'absolute',
        top: 0,
        width: 2 * width,
        flexDirection: 'row',
        height: height - 76,
      },
    })

    return this.props.fetching ? <AssetLoader /> : (
      <Animated.View style={styles.container}>
        <Animated.View style={[
          styles.inputView, {
            left: this.state.stepOffset.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -width],
            }),
          }]}
        >
          <BookHomePage
            book={this.props.book}
            goToNew={this.goToNew}
            handleItemForEdit={this.handleItemForEdit}
          />
          <BookFormPage
            form={this.state.form}
            goToScan={this.props.actions.navigateToScan}
            backAndClean={this.backAndClean}
            item={this.state.form === 'quote'
              ? this.state.quote
              : this.state.form === 'comment'
                ? this.state.comment
                : {}
            }
            extracted={this.state.extracted}
            comment={this.state.comment}
            handleForm={this.state.form === 'quote' || this.state.form === 'new'
              ? this.handleQuote
              : this.state.form === 'comment'
                ? this.handleComment
                : null
            }
            handleSubmit={
              this.state.form === 'quote' || this.state.form === 'comment'
                ? this.submitEdit
                : this.submitNew
            }
          />
        </Animated.View>
      </Animated.View>
    )
  }
}

function mapStateToProps(state) {
  return {
    jwt: state.session.jwt,
    book: state.books.currentBook,
    flow: state.flow,
    fetching: state.fetching,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, bookActions, flowActions, quoteActions, navigationActions), dispatch),
  }
}

export default appearsFromRight(connect(mapStateToProps, mapDispatchToProps)(BookEditContainer))
