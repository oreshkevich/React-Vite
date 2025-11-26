import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './app/App.tsx';
import './globals.scss';

import {ThemeProvider} from '@/shared/lib/theme/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
