import * as React from 'react'
import useCategories from '../hooks/useCategories'
import { Category, Product, Question } from '../types'

type LanguageProviderProps = { children: React.ReactNode }

const LanguageStateContext = React.createContext<any>(undefined)

function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = React.useState('ES')
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
