import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/app/App';
// Шрифт из макета, раздаётся вместе со сборкой (без внешнего CDN)
import '@fontsource/montserrat/400.css';
import '@/app/styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
