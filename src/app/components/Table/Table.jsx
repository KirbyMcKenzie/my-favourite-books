import React from "react";
import styles from "./Table.module.scss";

const Table = ({ data, columns = [] }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className={`${styles.tableHeader} ${col.headerClass || ""}`}
            >
              {col.header || col.key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td
                key={col.key}
                className={`${styles.tableCell} ${col.cellClass || ""}`}
              >
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
