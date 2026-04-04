import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import your pages/components here

import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Dashboard from './features/dashboard/index';
import AddProduct from './features/dashboard/Add-Product';
import Categories from './features/dashboard/Categories';
import EditProduct from './features/dashboard/Edit-Product';
import { Suspense } from 'react';


const AppRouter: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />}>
            <Route index element={<AddProduct />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products/:id/edit" element={<EditProduct />} />
          </Route>
          <Route path="*" element={<Dashboard />} /> 

        </Routes>
      </Suspense>
    </Router>
  );
};  

export default AppRouter;
