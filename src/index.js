import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom
import './index.css';
import App from './App';
import ShopContextProvider from './Context/ShopContext';

const root = createRoot(document.getElementById('root')); // Use createRoot
root.render(
  <ShopContextProvider>
    <App />
  </ShopContextProvider>
);
