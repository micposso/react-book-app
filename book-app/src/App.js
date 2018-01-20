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

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
            <SearchComponent activateSearch={this.SearchBarAction} />
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

  {/* <ol className="books-grid">
  {this.state.books ?
  this.state.books.map((book, index) => 
    <li key={index}>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
          <div className="book-shelf-changer">
            <select name={book.title} onChange={(e) => {
              e.persist();
              console.log('vallllll  e', e);
              this.setState({books: this.state.books.filter(book => book.title != e.target.name)}, () => {
                let newState = {};
                newState[e.target.value] = this.state[e.target.value].concat(book);
                console.log('the new stateeeee', newState);
                this.setState(newState);
              });
            }}>
              <option value="none" disabled>Move to...</option>
              <option value="wantToRead">Want to Read</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors.join(', ')}</div>
      </div>
    </li>
  )
    :
    ''
  }
  </ol>
</div>
</div> */}