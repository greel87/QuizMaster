import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RootNavigation } from './navigation/rootNavigation.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootNavigation />
  </StrictMode>,
)
