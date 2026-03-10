import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PendaftaranProvider } from './context/PendaftaranContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PendaftaranProvider>
        <App />
      </PendaftaranProvider>
    </BrowserRouter>
  </StrictMode>,
)