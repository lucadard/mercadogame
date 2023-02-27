import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'

import { LanguageProvider } from './context/LanguageContext'
import { GameProvider } from './context/GameContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <LanguageProvider>
    <GameProvider>
      <App />
    </GameProvider>
  </LanguageProvider>
  // </React.StrictMode>
)
