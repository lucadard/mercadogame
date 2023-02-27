import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'

import { GameProvider } from './context/GameContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <GameProvider>
    <App />
  </GameProvider>
  // </React.StrictMode>
)
