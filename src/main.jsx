import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Route, Routes,useLocation } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'; // Import SnackbarProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}> {/* Wrap App with SnackbarProvider */}
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </StrictMode>
)
