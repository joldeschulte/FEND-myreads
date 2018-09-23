import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Shelf from './Shelf'

class Shelves extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: []
    }
  }
  componentDidMount () {
    // Use the BooksAPI to getAll the books from the server
    BooksAPI.getAll().then(res => this.setState({ books: res }))
  }

  updateBook = (book, shelf) => {
    // Use the BooksAPI to update the book.shelf
    // then update the shelves by adding all of the currently shelved books by adding the one that changed shelves to the books that aren't the one that just updated.
    BooksAPI.update(book, shelf)
    .then(res => {
      book.shelf = shelf
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }))
    })
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf updateBook={this.updateBook} name="Currently Reading" books={this.state.books.filter(book => book.shelf === "currentlyReading")} />
            <Shelf updateBook={this.updateBook} name="Want To Read" books={this.state.books.filter(book => book.shelf === "wantToRead")} />
            <Shelf updateBook={this.updateBook} name="Read" books={this.state.books.filter(book => book.shelf === "read")} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Shelves
