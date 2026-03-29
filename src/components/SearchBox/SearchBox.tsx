import React from 'react';
import { SearchIcon } from '../../asset/icons';
import styles from './styles/SearchBox.module.css';

type SearchBoxVariant = 'round' | 'default' | 'compact';

type SearchBoxProps = {
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  variant?: SearchBoxVariant;
  className?: string;
};

const SearchBox = ({
  placeholder = 'Search',
  value,
  onChange,
  variant = 'round',
  className = '',
}: SearchBoxProps) => {
  return (
    <div className={`${styles.searchBox} ${styles[variant]} ${className}`.trim()}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <span className={`${styles.searchIcon} ${styles[variant + 'Icon']}`}>
        <SearchIcon />
      </span>
    </div>
  );
};

export default SearchBox;
