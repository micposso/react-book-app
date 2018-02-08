import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import scapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class SearchComponent extends Component{

    state = {
        searchQuery: ''
    }

    updateSearch = (query) => {
        this.setState({
            searchQuery: query.trim()
        })
    }

    render() {
        let showBooks
        if (this.state.searchQuery) {
            const titleMatch = new RegExp(scapeRegExp(this.state.searchQuery), 'i')
            showBooks = this.props.bookList.filter((book) => titleMatch.test(book.title))
        } else {
            showBooks = this.props.bookList
        }
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
                {showBooks ?
                showBooks.map((book, index) => 
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
                        <div className="book-authors">{book.authors.join(', ')}</div>
                        </div>
                    </li>
                    )
                    :
                    'Your Search Did not Return Any Book'
                } 
            </ol>
                </div>
                </div>
          </div>
        )
    }
}


export default SearchComponent


