import { createRoot } from 'react-dom/client';
import { HeroUIProvider } from '@heroui/system';
import { App } from './views/App';
import '@/styles/globals.css';
import '@/styles/search.css';
import '@/styles/background.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <HeroUIProvider>
    <App />
  </HeroUIProvider>,
);
