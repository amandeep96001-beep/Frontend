
import styles from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>DEALPORT</div>
      <nav className={styles.menu}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Main menu</div>
          <ul>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  [styles.navItem, isActive ? styles.active : ''].filter(Boolean).join(' ')
                }
              >
                <span className={styles.iconPlaceholder}></span>
                Dashboard
              </NavLink>
            </li>
            <li><div className={styles.navItem}><span className={styles.iconPlaceholder}></span>Order Management</div></li>
            <li><div className={styles.navItem}><span className={styles.iconPlaceholder}></span>Customers</div></li>
            <li><div className={styles.navItem}><span className={styles.iconPlaceholder}></span>Coupon Code</div></li>
            <li>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  [styles.navItem, isActive ? styles.active : ''].filter(Boolean).join(' ')
                }
              >
                <span className={styles.iconPlaceholder}></span>
                Categories
              </NavLink>
            </li>
            <li><div className={styles.navItem}><span className={styles.iconPlaceholder}></span>Transaction</div></li>
            <li><div className={styles.navItem}><span className={styles.iconPlaceholder}></span>Brand</div></li>
          </ul>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Product</div>
          <ul>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  [styles.navItem, isActive ? styles.active : ''].filter(Boolean).join(' ')
                }
              >
                <span className={styles.iconPlaceholder}></span>
                Add Products
              </NavLink>
            </li>
            <li><div className={styles.navItem}><span className={styles.iconPlaceholder}></span>Product Media</div></li>
            <li><div className={styles.navItem}><span className={styles.iconPlaceholder}></span>Product List</div></li>
            <li><div className={styles.navItem}><span className={styles.iconPlaceholder}></span>Product Reviews</div></li>
          </ul>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Admin</div>
          <ul>
            <li><span className={styles.iconPlaceholder}></span>Admin role</li>
            <li><span className={styles.iconPlaceholder}></span>Control Authority</li>
          </ul>
        </div>
      <div className={styles.section}>
        <div className={styles.userInfo}>
          <span className={styles.iconPlaceholder}></span>
          <span>Dealport<br /><small>Mark@thedesigner...</small></span>
        </div>
        <div className={styles.shopLink}>Your Shop</div>
      </div>
      </nav>
    </aside>
  );
};

export default Sidebar;