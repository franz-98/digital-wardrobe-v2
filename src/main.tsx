
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WardrobeProvider } from './context/WardrobeContext.tsx'
import { ThemeProvider } from '@/components/ThemeProvider.tsx'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="wardrobe-theme">
    <WardrobeProvider>
      <App />
    </WardrobeProvider>
  </ThemeProvider>
);
