import React from 'react'
import SearchComponent from './components/SearchComponent.js'
import * as BooksAPI from './BooksAPI'
import CurrentlyReadingComponent from './components/CurrentlyReadingComponent'
import WantToReadComponent from './components/WantToReadComponent'
import ReadComponent from './components/ReadComponent'
import './css/App.css'
//import { getAll } from './BooksAPI.js';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    currentlyReading: [],
    wantToRead: [],
    alreadyRead: []
  }

  SearchBarAction = () => {
    console.log("click")
    if(this.state.showSearchPage === false) {
      this.setState({
        showSearchPage: true,
      })
    } else {
      this.setState({
        showSearchPage: false,
      })
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(books => this.setState({books: books}))
    .catch(err => console.log('this is an error in the book API', err))
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
            <SearchComponent books={this.state.books} activateSearch={this.SearchBarAction} />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <CurrentlyReadingComponent alreadyRead={this.state.currentlyReading} />
                <WantToReadComponent wantToRead={this.state.wantToRead} />
                <ReadComponent alreadyRead={this.state.alreadyRead} />
            </div>
            <div className="open-search">
              <a onClick={this.SearchBarAction.bind(this)}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp

