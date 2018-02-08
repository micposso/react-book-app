import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'
import scapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class SearchComponent extends Component{

    state = {
        searchQuery: '',
        displayBooks: []
    }

    updateSearch = (query) => {
        this.setState({
            searchQuery: query.trim()
        });
        if ( query.length > 0 ) {
            //make a api request, and filter the searchquery with all books to return a match and pass that to the displaybooks state
            BooksAPI.search(query, 20).then((searchedBooks) => {
                const displayBooks = searchedBooks ? searchedBooks : [];
                BooksAPI.getAll().then((books) => {
                    for ( const displayBook of displayBooks) {
                        const shelfBook = books.find(book => book.id === displayBook.id )
                        if ( shelfBook ) {
                            displayBook.shelf = shelfBook.shelf;
                        }
                    this.setState({ displayBooks });
                    }
                })
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
                            <input 
                                type="text"
                                value={this.state.searchQuery}
                                onChange={(event) => this.updateSearch(event.target.value)}
                            />
                        </div>
                    </div>
                <div className="search-books-results">
                <ol className="books-grid">
                {this.state.displayBooks ?
                this.state.displayBooks.map((book, index) => 
                    <li key={index}>
                        <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                            <select name={book.title} onChange={(e) => this.props.handleChangeShelve(e, book.title)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="alreadyRead">Read</option>
                                <option value="none">None</option>
                            </select>
                            </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        </div>
                    </li>
                    )
                    :
                    <h2>{this.props.message}</h2>
                } 
            </ol>
                </div>
                </div>
          </div>
        )
    }
}


export default SearchComponent


