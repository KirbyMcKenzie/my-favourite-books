"use client";
import { useEffect, useState } from "react";
import Table from "../Table";
import SearchableSelect from "../SearchableSelect";
import { titleCase } from "../../helpers/string";
import Books from "../../../../data/books";
import styles from "./BookTable.module.scss";

const booksApi = new Books();

const genres = [
  "biography",
  "business",
  "design",
  "history",
  "nonfiction",
  "politics",
  "programming",
  "science",
  "self help",
];

const genreOptions = genres.map((genre) => ({
  value: genre,
  label: titleCase(genre),
}));

const columns = [
  { key: "title", header: "Title", cellClass: "text-content-2-bold" },
  { key: "author", header: "Author", cellClass: "text-content-4" },
  { key: "year", header: "Year", cellClass: "text-content-2" },
  {
    key: "genre",
    header: "Genre",
    cellClass: "text-content-4",
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
      try {
        const data = await booksApi.askListBooks({
          limit: 10,
          genre: selectedGenre,
        });
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [selectedGenre]);

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
