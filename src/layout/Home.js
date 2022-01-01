import React from "react";
import { useNavigate } from "react-router-dom";
import Book from "../components/Book";

function Home({ userBooks, bookChangeHandler }) {
  const navigate = useNavigate();

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {/* Currently Reading Shelf */}
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {/* Books Where shelf = "currentlyReading" */}
                {userBooks.length
                  ? userBooks
                      .filter((item) => item.shelf === "currentlyReading")
                      .map((book) => {
                        return (
                          <Book
                            key={book.id}
                            data={book}
                            shelf={book.shelf ? book.shelf : "none"}
                            shelfChangeHandler={bookChangeHandler}
                          />
                        );
                      })
                  : ""}
              </ol>
            </div>
          </div>
          {/* Want to Read Shelf */}
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {/* Books Where shelf = "wantToRead" */}
                {userBooks.length
                  ? userBooks
                      .filter((item) => item.shelf === "wantToRead")
                      .map((book) => {
                        return (
                          <Book
                            key={book.id}
                            data={book}
                            shelf={book.shelf ? book.shelf : "none"}
                            shelfChangeHandler={bookChangeHandler}
                          />
                        );
                      })
                  : ""}
              </ol>
            </div>
          </div>
          {/* Read Shelf */}
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {/* Books Where shelf = "read" */}
                {userBooks.length
                  ? userBooks
                      .filter((item) => item.shelf === "read")
                      .map((book) => {
                        return (
                          <Book
                            key={book.id}
                            data={book}
                            shelf={book.shelf ? book.shelf : "none"}
                            shelfChangeHandler={bookChangeHandler}
                          />
                        );
                      })
                  : ""}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <button onClick={() => navigate("/search/~")}>Add a book</button>
      </div>
    </div>
  );
}

export default Home;
