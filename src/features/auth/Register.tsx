import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Register.module.css';
import Button from '../../components/Button/Button';
import axios from 'axios';

interface RegisterForm {
  name: string;
  email: string;
  contact: string;
  image: File | null;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    contact: '',
    image: null,
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});




  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files) {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const navigate = useNavigate();
  const loginHandaler = () => {
    navigate('/login');
  } 

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.contact) newErrors.contact = 'Contact number is required';
    if (!form.image) newErrors.image = 'Image is required';
    if (!form.password) newErrors.password = 'Password is required';
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const formData = new FormData();
  formData.append('name', form.name);
  formData.append('email', form.email);
  formData.append('contactNumber', form.contact);
  if (form.image) {
    formData.append('image', form.image);
  }
  formData.append('password', form.password);
console.log(process.env.BACKEND_URL_LOCAL);
  const  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    try{
          if (Object.keys(validationErrors).length === 0) {
     
     await axios.post(`http://localhost:5000/api/v1/auth/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      alert('Registration successful!');
    }
    }catch(error){
      alert('Registration failed. Please try again.');
    }

  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <div className={styles.registerLogo}>
          <span className={styles.brandLogo}>Brand</span>
        </div>
        <div className={styles.registerTitle}>Register</div>
        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <div className={styles.registerField}>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} style={{ color: '#222' }} />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>
          <div className={styles.registerField}>
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} style={{ color: '#222' }} />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>
          <div className={styles.registerField}>
            <input name="contact" type="tel" placeholder="Contact Number" value={form.contact} onChange={handleChange} style={{ color: '#222' }} />
            {errors.contact && <span className={styles.error}>{errors.contact}</span>}
          </div>
          <div className={styles.registerField}>
            <input name="image" type="file" accept="image/*" onChange={handleChange} style={{ color: '#222', background: '#fff' }} />
            {errors.image && <span className={styles.error}>{errors.image}</span>}
          </div>
          <div className={styles.registerField}>
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} style={{ color: '#222' }} />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>
          <div className={styles.registerField}>
            <input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} style={{ color: '#222' }} />
            {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
          </div>
       <Button variant="primary" onClick={()=>{
            
          }} label="Register"/>
        </form>
        <div className={styles.registerFooter}>
          Already have an account?
          <a className={styles.registerLink} onClick={loginHandaler}>Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
