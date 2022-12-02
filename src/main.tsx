import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'

import { EmojiProvider } from 'react-apple-emojis'
import emojiData from 'react-apple-emojis/src/data.json'

import { LanguageProvider } from './context/LanguageContext'
import { GameProvider } from './context/GameContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <LanguageProvider>
    <GameProvider>
      <EmojiProvider data={emojiData}>
        <App />
      </EmojiProvider>
    </GameProvider>
  </LanguageProvider>
  // </React.StrictMode>
)
