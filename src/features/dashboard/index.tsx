import Sidebar from './sidebar/Sidebar';
import styles from './Dashboard.module.css';
import Navbar from '../../components/Navbar/Navbar';
import FeatureComingSoon from './FeatureComingSoon/AddProducts';

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <Navbar />
        <main className={styles.mainContent}>
          <FeatureComingSoon />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;