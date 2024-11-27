"use client";
import { useState, useEffect, useRef } from "react";

import ListItem from "./SearchableSelectListItem";
import ArrowDownIcon from "../Icons/ArrowDown";
import ClearIcon from "../Icons/Clear";
import styles from "./SearchableSelect.module.scss";

const SearchableSelect = ({
  options = [],
  placeholder = "Select...",
  onChange = () => {},
  onClear = () => {},
}) => {
  const selectRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClear = () => {
    setSelected(null);
    setFilter("");
    setIsOpen(true);
    onClear();
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSelect = (option) => {
    setSelected(option);
    setFilter(option.label);
    setIsOpen(false);
    onChange(option);
  };

  const handleToggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.root} ref={selectRef}>
      <div
        className={`${styles.inputContainer} ${isOpen ? styles.open : ""}`}
        onClick={handleToggleDropdown}
        aria-expanded={isOpen}
        role="button"
        tabIndex={0}
      >
        <input
          type="text"
          className={styles.search}
          placeholder={placeholder}
          value={filter}
          onChange={handleFilterChange}
        />
        <div className={styles.decoration}>
          {selected ? (
            <button
              aria-label="Clear selection"
              className={styles.clearButton}
              onClick={handleClear}
            >
              <ClearIcon />
            </button>
          ) : (
            <ArrowDownIcon />
          )}
        </div>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          {filteredOptions.length > 0 && (
            <ul className={styles.options} role="listbox">
              {filteredOptions.map((option) => (
                <ListItem
                  key={option.value}
                  option={option}
                  filter={filter}
                  isSelected={selected?.value === option.value}
                  onSelect={handleSelect}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
