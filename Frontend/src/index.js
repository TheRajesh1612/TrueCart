import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './store/components/CartContext/CartContext';
import { AuthProvider } from './store/context/AuthContext';
import { DataProvider } from './store/context/DataContext';
import { ThemeProvider } from './store/context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeProvider>
        <AuthProvider>              
          <DataProvider>
            <CartProvider>
              <App />
              <ToastContainer />       
            </CartProvider>
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>
);
