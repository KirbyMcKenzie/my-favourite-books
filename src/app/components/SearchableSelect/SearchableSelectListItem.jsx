import styles from "./SearchableSelect.module.scss";

const SearchableSelectListItem = ({ option, filter, isSelected, onSelect }) => {
  const matchIndex = option.label.toLowerCase().indexOf(filter.toLowerCase());
  const beforeMatch = option.label.slice(0, matchIndex);
  const matchText = option.label.slice(matchIndex, matchIndex + filter.length);
  const afterMatch = option.label.slice(matchIndex + filter.length);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      onSelect(option);
    }
  };

  return (
    <li
      className={styles.option}
      aria-selected={isSelected}
      role="option"
      tabIndex={0}
      onClick={() => onSelect(option)}
      onKeyDown={handleKeyDown}
    >
      {matchIndex >= 0 && !isSelected ? (
        <>
          {beforeMatch}
          <strong>{matchText}</strong>
          {afterMatch}
        </>
      ) : (
        option.label
      )}
    </li>
  );
};

export default SearchableSelectListItem;
