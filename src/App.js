import React from 'react'
import { Route } from 'react-router-dom'
import Shelves from './components/Shelves'
import Search from './components/Search'
import './App.css'

class BooksApp extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={ Shelves } />
        <Route exact path="/search" component={ Search } />
      </div>
    )
  }
}

export default BooksApp
