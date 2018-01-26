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
    currentlyReading: [],
    wantToRead: [],
    alreadyRead: [],
    books: []
  }

  changeShelve = (event, title) => {
    const shelveType = event.target.value;
    console.log(shelveType);

    if(shelveType === 'none' || shelveType === null || shelveType === undefined) return;

    let choosenBook = this.state.books.filter((book) => book.title === title);
    // need to remove from old shelve and put into the new shelve. 
    this.setState((prevState) => {
      return {[shelveType]: [...prevState[shelveType], choosenBook]}
    });
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(books => this.setState({books: books}))
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
                  <CurrentlyReadingComponent currentlyReading={this.state.currentlyReading} handleChangeShelve={this.changeShelve}/>
                  <WantToReadComponent wantToRead={this.state.wantToRead} handleChangeShelve={this.changeShelve}/>
                  <ReadComponent alreadyRead={this.state.alreadyRead} handleChangeShelve={this.changeShelve}/>
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

