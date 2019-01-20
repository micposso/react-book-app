import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'
import scapeRegExp from 'escape-string-regexp'
import { DebounceInput } from 'react-debounce-input'
import sortBy from 'sort-by'


class SearchComponent extends Component{

    state = {
        searchQuery: '',
        displayBooks: [],
    }

    updateSearch = (query) => {

        if ( query.length >= 0 ) {
            this.setState({
                searchQuery: query
            });
            BooksAPI.search(query, 20).then((searchedBooks) => {
                const displayBooks = searchedBooks ? searchedBooks : [];
                if ( searchedBooks && searchedBooks.length > 0 ) {
                    const books = this.props.bookList;
                        for ( const displayBook of displayBooks) {
                            const shelfBook = books.find(book => book.id === displayBook.id )
                            if ( shelfBook ) {
                                displayBook.shelf = shelfBook.shelf;
                            }
                            this.setState({ displayBooks });
                        }
                } else {
                  this.setState({
                      displayBooks: []
                  });
                }
                
            })
        } 
    }

    render() {
        return(
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to="/" className="close-search">Close</Link>
                        <div className="search-books-input-wrapper">
                            <DebounceInput
                                debounceTimeout={300} 
                                type="text"
                                value={this.state.searchQuery}
                                onChange={(event) => this.updateSearch(event.target.value)}
                            />
                        </div>
                    </div>
                <div className="search-books-results">
                <ol className="books-grid">
                <h2>{this.state.notFound}</h2>
                { this.state.displayBooks ? 
                this.state.displayBooks.map((book, index) => 
                <li key={index}>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                            <select onChange={(e) => this.props.handleChangeShelve(book, e.target.value)}>
                                <option>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                            </div>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </li>
                ) : <h2>Type a search term to display books</h2> }


         
            </ol>
                </div>
                </div>
          </div>
        )
    }
}


export default SearchComponent


