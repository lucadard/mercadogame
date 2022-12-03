import * as React from 'react'

import useLocalStorage from '../hooks/useLocalStorage'

type LanguageProviderProps = { children: React.ReactNode }

type Language = 'ES' | 'EN'

const LanguageStateContext = React.createContext<
  | {
      language: Language
      setLanguage: (language: Language) => void
    }
  | undefined
>(undefined)

function LanguageProvider({ children }: LanguageProviderProps) {
  const { storedValue: language, setValue: setLanguage } =
    useLocalStorage<Language>('language', 'ES')

  const value = { language, setLanguage }
  return (
    <LanguageStateContext.Provider value={value}>
      {children}
    </LanguageStateContext.Provider>
  )
}

function useLanguage() {
  const context = React.useContext(LanguageStateContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a GameProvider')
  }
  return context
}

export { LanguageProvider, useLanguage }
