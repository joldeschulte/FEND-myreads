import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      results: [],
      query: ""
    }
  }

  componentDidMount () {
    BooksAPI.getAll()
    .then(res => {
      this.setState({ books: res })
    })
  }

  updateQuery = (query) => {
    this.setState({query: query}, this.submitSearch)
  }

  submitSearch() {
    if(this.state.query === '' || this.state.query === undefined) {
      return this.setState({ results: [] })
    }
    BooksAPI.search(this.state.query.trim()).then(res => {
      if(res.error) {
        return this.setState({ results: [] })
      }
      else {
        res.forEach(book => {
          let f = this.state.books.filter(b => b.id === book.id)
          if (f[0]) {
            book.shelf = f[0].shelf
          }
        })
        return this.setState({ results: res })
      }
    })
  }

  updateBook = (book, shelf) => {
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
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={ (event) =>this.updateQuery(event.target.value) }/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { this.state.results.map((book, key) => <Book key={key} book={book} updateBook={this.updateBook} />) }
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
