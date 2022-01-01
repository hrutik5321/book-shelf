import { useState, useEffect } from "react";
import "./App.css";
import { getAll, update } from "./BooksAPI";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./layout/Home";
import Search from "./layout/Search";

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = () => {
    getAll()
      .then((response) => {
        setBooks(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // UPDATE SHELF
  const updateShelf = (book, shelf) => {
    // CALL UPDATE API
    update(book, shelf).catch((error) => {
      console.log(error);
    });

    if (shelf === "none") {
      let prevState = books.filter((b) => b.id !== book.id);
      setBooks(prevState);
    } else {
      book.shelf = shelf;
      const newBook = books.filter((b) => b.id !== book.id);
      newBook.push(book);
      setBooks(newBook);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home userBooks={books} bookChangeHandler={updateShelf} />}
          />
          <Route
            path="/search/:query"
            element={<Search bookChangeHandler={updateShelf} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
