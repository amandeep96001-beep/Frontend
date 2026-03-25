import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import your pages/components here

import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Sidebar from './features/dashboard/sidebar/Sidebar';
import { Suspense } from 'react';


const AppRouter: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="*" element={<Sidebar />} /> 

        </Routes>
      </Suspense>
    </Router>
  );
};  

export default AppRouter;
