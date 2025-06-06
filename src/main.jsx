import { StrictMode } from 'react'; // ⬅️ обязательно
import { createRoot } from 'react-dom/client';
import App from './App'; // ⬅️ правильный путь
import './index.css';

const rootElement = document.getElementById('root');
const reactRoot = createRoot(rootElement);

reactRoot.render(
  <StrictMode>
    <App />
  </StrictMode>
);
