import styles from "./page.module.scss";
import Books from "../../data/books";
import Table from "./components/table";

export default async function Home() {
  const booksApi = new Books();
  const books = await booksApi.askListBooks();
  const columns = ["title", "author", "year", "genre"];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>{"📚 My Favorite Books"}</h1>

        <Table columns={columns} data={books} />
      </main>
    </div>
  );
}
