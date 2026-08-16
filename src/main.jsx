import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// 👇 TAMBAHKAN 2 BARIS INI SEBELUM REACT ME-RENDER WEB-NYA
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0); // Paksa ke atas seketika saat file JS baru saja di-download

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)