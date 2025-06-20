import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TropPoIt from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TropPoIt />
  </StrictMode>,
)
