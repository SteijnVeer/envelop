import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.documentElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
