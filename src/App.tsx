


import React from 'react';

import AppRouter from './AppRouter';
import './index.css';

import HelmetAsyncProvider from './providers/HelmetAsyncProvider';
import { ErrorProvider } from './providers/ErrorProvider';
import { NotificationProvider } from './providers/NotificationProvider';


function App() {
  return (
    <HelmetAsyncProvider>
      <ErrorProvider>
        <NotificationProvider>
          <div className="App">
            <AppRouter />
          </div>
        </NotificationProvider>
      </ErrorProvider>
    </HelmetAsyncProvider>
  );
}

export default App;
