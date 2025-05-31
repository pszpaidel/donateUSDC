import { createRoot } from 'react-dom/client';
import { HeroUIProvider } from '@heroui/system';
import { App } from './views/App';
import '@/styles/globals.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <HeroUIProvider>
    <App />
  </HeroUIProvider>,
);
