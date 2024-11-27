import styles from "./Table.module.scss";
import TableLoader from "./TableLoader";

const Table = ({ data, columns = [], isLoading = false, loaderStyles }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeaderRow}>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`${styles.tableHeader} ${col.headerClass || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={styles.tableBody}>
          {isLoading ? (
            <TableLoader colSpan={columns.length} loaderStyles={loaderStyles} />
          ) : (
            data.map((row, index) => (
              <tr key={index} className={styles.tableRow}>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`${styles.tableCell} ${col.cellClass || ""}`}
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
