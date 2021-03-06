import React from "react";

function Book({ data, shelfChangeHandler, shelf }) {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${data.imageLinks.thumbnail})`,
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={shelf}
              onChange={(e) => shelfChangeHandler(data, e.target.value)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{data.title}</div>

        <div className="book-authors">
          {data.authors && data.authors.map((author) => `${author},`)}
        </div>
      </div>
    </li>
  );
}

export default Book;
