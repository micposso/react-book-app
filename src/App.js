import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

import SearchComponent from './components/SearchComponent.js'
import CurrentlyReadingComponent from './components/CurrentlyReadingComponent'
import WantToReadComponent from './components/WantToReadComponent'
import ReadComponent from './components/ReadComponent'
import './css/App.css'
//import { getAll } from './BooksAPI.js';

class BooksApp extends React.Component {
  state = {
    books: [],
    message: "You dont have any books on this shelf"
  }

  changeShelve(book, shelve) {
    BooksAPI.update(book, shelve).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books });
      })
    })

  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(books => this.setState({ books }))
    .catch(err => console.log('this is an error in the book API', err))
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <SearchComponent bookList={this.state.books} handleChangeShelve={this.changeShelve}/>
        )}/>
        <Route exact path="/" render={() => (
          <div>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                  <CurrentlyReadingComponent message={this.state.message} books={this.state.books.filter( book => book.shelf === "currentlyReading")} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
        </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp

