import styles from './Navbar.module.css';
import React from 'react';
import SearchBox from '../SearchBox/SearchBox';

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.left}>Add Product</div>
 
      <div className={styles.right}>
        <SearchBox placeholder="Search product for add" />
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