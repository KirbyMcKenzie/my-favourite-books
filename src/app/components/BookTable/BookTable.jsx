"use client";
import { useEffect, useState } from "react";
import Table from "../Table";
import SearchableSelect from "../SearchableSelect";
import { titleCase } from "../../helpers/string";
import Books from "../../../../data/books";
import styles from "./BookTable.module.scss";

const booksApi = new Books();

const columns = [
  { key: "title", header: "Title", cellClass: "text-content-sm-bold" },
  { key: "author", header: "Author", cellClass: "text-content-xs" },
  { key: "year", header: "Year", cellClass: "text-content-sm" },
  {
    key: "genre",
    header: "Genre",
    cellClass: "text-content-xs",
    render: (values) =>
      values.map(
        (value, index) => `${index !== 0 ? "," : ""} ${titleCase(value)}`
      ),
  },
];

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await booksApi.askListBooks({
        limit: 10,
        genre: selectedGenre,
      });
      setBooks(data);
      setIsLoading(false);
    }

    fetchData();
  }, [selectedGenre]);

  const genres = [...new Set(books.flatMap(({ genre }) => genre))];
  const genreOptions = genres.map((genre) => ({
    value: genre,
    label: titleCase(genre),
  }));

  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <SearchableSelect
          options={genreOptions}
          placeholder="Genre"
          isClearable
          onChange={(e) => setSelectedGenre(e.value)}
          onClear={() => setSelectedGenre(null)}
        />
      </div>

      <div className={styles.tableWrapper}>
        <Table
          columns={columns}
          data={books}
          isLoading={isLoading}
          loaderStyles={styles.loaderWrapper}
        />
      </div>
    </div>
  );
};

export default BookTable;
