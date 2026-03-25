
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>DEALPORT</div>
      <nav className={styles.menu}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Main menu</div>
          <ul>
            <li className={styles.active}><span className={styles.iconPlaceholder}></span>Dashboard</li>
            <li><span className={styles.iconPlaceholder}></span>Order Management</li>
            <li><span className={styles.iconPlaceholder}></span>Customers</li>
            <li><span className={styles.iconPlaceholder}></span>Coupon Code</li>
            <li><span className={styles.iconPlaceholder}></span>Categories</li>
            <li><span className={styles.iconPlaceholder}></span>Transaction</li>
            <li><span className={styles.iconPlaceholder}></span>Brand</li>
          </ul>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Product</div>
          <ul>
            <li><span className={styles.iconPlaceholder}></span>Add Products</li>
            <li><span className={styles.iconPlaceholder}></span>Product Media</li>
            <li><span className={styles.iconPlaceholder}></span>Product List</li>
            <li><span className={styles.iconPlaceholder}></span>Product Reviews</li>
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