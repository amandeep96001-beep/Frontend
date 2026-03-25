import { SearchIcon } from '../../asset/icons';
import styles from './Navbar.module.css';
import React from 'react';

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.left}>Add Product</div>
 
      <div className={styles.right}>
         <div className={styles.searchBox}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search data, users, or reports"
          />
          <span className={styles.searchIcon}>
            <SearchIcon />
          </span>
        </div>
        <button className={styles.iconBtn} title="Notifications">
          <span role="img" aria-label="bell">🔔</span>
        </button>
        <button className={styles.iconBtn} title="Theme">
          <span role="img" aria-label="theme">⚙️</span>
        </button>
        <img
          className={styles.avatar}
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User Avatar"
        />
      </div>
    </header>
  );
};

    export default Navbar;