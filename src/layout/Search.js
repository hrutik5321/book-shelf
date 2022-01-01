import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { search } from "../BooksAPI";
import { update } from "../BooksAPI";
import Book from "../components/Book";

function Search({ bookChangeHandler }) {
  const navigate = useNavigate();
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch books on input change
  const onValueChange = (value) => {
    if (value) {
      setSearchQuery(value);
      search(value)
        .then((response) => {
          setResults(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSearchQuery("");
      setResults([]);
    }
  };

  // fetch books if there is query in the URL
  const fetchQueryBooks = () => {
    if (query !== "~") {
      search(query)
        .then((response) => {
          setResults(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // on form submit set query in url
  const submitHandler = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search/${searchQuery}`);
    }
  };

  useEffect(() => {
    fetchQueryBooks();
  }, [query]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => navigate("/")}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          <form action="" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(e) => {
                onValueChange(e.target.value);
              }}
            />
          </form>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {results.length ? (
            results.map((book) => {
              return (
                <Book
                  key={book.id}
                  data={book}
                  shelf={book.shelf ? book.shelf : "none"}
                  shelfChangeHandler={bookChangeHandler}
                />
              );
            })
          ) : (
            <h2>No Results</h2>
          )}
        </ol>
      </div>
    </div>
  );
}

export default Search;
