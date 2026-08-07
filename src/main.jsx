import React from 'react';
import ReactDOM from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Seo from './components/Seo.jsx';
import { bootstrapIntroVideoPreload } from './utils/introSplash.js';
import './styles/global.css';

// Begin buffering the intro video before React mounts the lazy Home route.
bootstrapIntroVideoPreload();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <ErrorBoundary>
        <BrowserRouter>
          <Seo />
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </MotionConfig>
  </React.StrictMode>,
);
