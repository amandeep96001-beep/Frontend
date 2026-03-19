
import styles from './styles/Login.module.css';
import React, { useState } from 'react';
import { useNotification } from '../../providers/NotificationProvider';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:5000/api/v1/auth/login',
        data: {
          email,
          password
        }
      });
      showNotification({ message: 'Login successful!', type: 'success' });
   
      console.log(response.data);
    } catch (error) {
      showNotification({ message: 'Login failed. Please check your credentials.', type: 'error' });
      console.error(error);
    }
  };

  const navigate = useNavigate();
  const registerHandaler = () => {
    navigate('/register');
  };

  return (
    <div className={styles['login-container']}>
      <form className={styles['login-card']} onSubmit={handleSubmit}>
        <div className={styles['login-logo']}>
          <span className={styles['brand-logo']}>DEALPORT</span>
        </div>
        <h2 className={styles['login-title']}>Login to your account</h2>
        <div className={styles['login-field']}>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles['login-field']}>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <Button variant="primary" label="Login" onClick={() => {}} />
        <div className={styles['login-footer']}>
          <span>Don&apos;t have an account?</span> <a className={styles['login-link']} onClick={registerHandaler}>Register</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
