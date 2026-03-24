import React, { useState } from 'react';
import { useNotification } from '../../providers/NotificationProvider';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Register.module.css';
import Button from '../../components/Button/Button';
import { useRegisterMutation } from './auth.api';
import { registerSchema } from '../../validation/register';
import { IRegisterForm } from './interface';
import type { ZodIssue } from 'zod';



const Register: React.FC = () => {
  const [form, setForm] = useState<IRegisterForm>({
    name: '',
    email: '',
    contact: '',
    image: null,
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof IRegisterForm, string>>>({});




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

const validate = (data: IRegisterForm) => {
  const result = registerSchema.safeParse(data);
  if (result.success) return {};
  const fieldErrors: Partial<Record<keyof IRegisterForm, string>> = {};
  result.error.issues.forEach((err: ZodIssue) => {
    const field = err.path[0] as keyof IRegisterForm;
    fieldErrors[field] = err.message;
  });
  return fieldErrors;
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
  const [register, { isLoading }] = useRegisterMutation();
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        await register(formData).unwrap();
        showNotification({ message: 'Registration successful!', type: 'success' });
      } catch (error) {
        showNotification({ message: 'Registration failed. Please try again.', type: 'error' });
      }
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <div className={styles.registerLogo}>
          <span className={styles.brandLogo}>Brand</span>
        </div>
        <div className={styles.registerTitle}>Register</div>
        <form onSubmit={handleSubmit} className={styles.IRegisterForm}>
          <div className={styles.registerField}>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>
          <div className={styles.registerField}>
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>
          <div className={styles.registerField}>
            <input name="contact" type="tel" placeholder="Contact Number" value={form.contact} onChange={handleChange}/>
            {errors.contact && <span className={styles.error}>{errors.contact}</span>}
          </div>
          <div className={styles.registerField}>
            <input name="image" type="file" accept="image/*" onChange={handleChange} />
            {errors.image && <span className={styles.error}>{errors.image}</span>}
          </div>
          <div className={styles.registerField}>
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>
          <div className={styles.registerField}>
            <input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
          </div>
       <Button variant="primary" onClick={()=> {}} label={isLoading ? 'Registering...' : 'Register'} />
        </form>
        <div className={styles.registerFooter}>
          Already have an account?
          <button type="button" className={styles.registerLink} onClick={loginHandaler}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
