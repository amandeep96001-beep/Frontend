import Sidebar from './sidebar/Sidebar';
import styles from './Dashboard.module.css';
import Navbar from '../../components/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/products/');

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.dashboardContent}>
        {!hideNavbar && <Navbar />}
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;