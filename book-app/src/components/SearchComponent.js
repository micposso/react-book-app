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

    changeShelve = (event, title) => {
        event.persist();
        console.log(event.target.value);
        let choosenBook = this.props.bookList.filter((book) => book.title !== title.title);
        console.log(choosenBook);
        
        // send the return book to the target value state
        //newState[event.target.value] = this.props.bookList[event.target.value];
        //this.setState(newState);
        //});
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
                            {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
            
                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                            */}
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
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
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


