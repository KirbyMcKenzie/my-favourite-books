import data from "./data.js";

export default class Books {
  askListBooks(queryParams) {
    return this._mockServerRequest(queryParams);
  }

  _mockServerRequest = ({ limit, genre }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredBooks = data.books;

        if (genre) {
          filteredBooks = filteredBooks.filter((book) =>
            book.genre.includes(genre)
          );
        }

        resolve(filteredBooks.slice(0, limit));
      }, this._random());
    });
  };

  _random() {
    return Math.floor(Math.random() * 1200);
  }
}
