import React, { Component } from 'react'


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
        return(
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <a className="close-search" onClick={() => this.props.activateSearch()}>Close</a>
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
                        /* add map script that renders all results books */      
                    </ol>
                </div>
                </div>
          </div>
        )
    }
}


export default SearchComponent


