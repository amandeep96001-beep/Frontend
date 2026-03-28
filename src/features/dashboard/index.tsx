import Sidebar from './sidebar/Sidebar';
import styles from './Dashboard.module.css';
import Navbar from '../../components/Navbar/Navbar';
import AddProduct from './Add-Product';

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.dashboardContent}>
        <Navbar />
        <main className={styles.mainContent}>
          <AddProduct />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;