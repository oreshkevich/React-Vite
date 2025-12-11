import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app/App';
import {Provider} from 'react-redux';
import {store} from '@/app/providers/store/store';
import {ThemeProvider} from '@/shared/lib/theme/ThemeContext';
import './globals.scss';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
