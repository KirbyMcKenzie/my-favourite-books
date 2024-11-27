import styles from "./page.module.scss";

import BookTable from "./components/BookTable";

export default async function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.headerContainer}>
        <h1 className="text-heading-1">{"📚 My Favorite Books"}</h1>
      </div>
      <BookTable />
    </main>
  );
}
