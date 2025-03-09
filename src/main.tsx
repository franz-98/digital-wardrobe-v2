
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WardrobeProvider } from './context/WardrobeContext.tsx'

createRoot(document.getElementById("root")!).render(
  <WardrobeProvider>
    <App />
  </WardrobeProvider>
);
