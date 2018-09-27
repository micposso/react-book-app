import React, { Component } from 'react'
import BookComponent from './BookComponent.js'

class BookShelfComponent extends Component{
    render(){
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.headline}</h2>
                <div className="bookshelf-books">        
                    <ol className="books-grid">
                        <BookComponent books={this.props.books} handleChangeShelve={this.props.handleChangeShelve} />
                    </ol>
                </div>
          </div>
        )
    }
}


export default BookShelfComponent