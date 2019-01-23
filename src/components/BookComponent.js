import React, { Component } from "react";

class BookComponent extends Component {
  componentWillReceiveProps() {
    console.log("book component moved");
  }

  render() {
    return (
      <div>
        {this.props.books.length ? (
          this.props.books.map((book, index) => (
            <li key={index}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks &&
                        book.imageLinks.thumbnail})`
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select
                      value={book.shelf}
                      onChange={e =>
                        this.props.handleChangeShelve(book, e.target.value)
                      }
                    >
                      <option value="none">Move to...</option>
                      <option value="currentlyReading">
                        Currently Reading
                      </option>
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
          ))
        ) : (
          <h2>{this.props.message}</h2>
        )}
      </div>
    );
  }
}

export default BookComponent;
