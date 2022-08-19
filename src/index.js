import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <CssBaseline />
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
