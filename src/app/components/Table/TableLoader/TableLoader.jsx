import styles from "./TableLoader.module.scss";
import LoadingSpinner from "../../LoadingSpinner";

const TableLoader = ({ colSpan, loaderStyles }) => {
  return (
    <tr className={styles.loadingRow}>
      <td colSpan={colSpan} className={`${styles.loadingCell} ${loaderStyles}`}>
        <div className={styles.loader}>
          <LoadingSpinner />
          {"Loading..."}
        </div>
      </td>
    </tr>
  );
};

export default TableLoader;
