import { createRoot } from 'react-dom/client';
import { HeroUIProvider } from '@heroui/system';
import { App } from './views/App';
import '@/styles/globals.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <HeroUIProvider>
    <main>
      <App />
    </main>
  </HeroUIProvider>
,
);
