import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

interface Props {
  children: React.ReactNode;
}

const HelmetAsyncProvider: React.FC<Props> = ({ children }) => {
  return <HelmetProvider>{children}</HelmetProvider>;
};

export default HelmetAsyncProvider;
