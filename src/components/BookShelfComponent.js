import React, { Component } from 'react'
import BookComponent from './BookComponent.js'

const BookShelfComponent = (props) => {
    return(
        <div className="bookshelf">
        <h2 className="bookshelf-title">{props.headline}</h2>
        <div className="bookshelf-books">        
            <ol className="books-grid">
                <BookComponent books={props.books} handleChangeShelve={props.handleChangeShelve} />
            </ol>
        </div>
    </div>
    )
}


export default BookShelfComponent