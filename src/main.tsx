import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// GitHub Pages serves the app from a repo sub‑path, so the router
// needs to know the base URL. Vite exposes `import.meta.env.BASE_URL`
// which is derived from `base` in vite.config.ts.
//
// Alternatively you can switch to HashRouter if you don't want to worry
// about the basename at all.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
