import * as React from 'react'
import api from '../api'
import useCategories from '../hooks/useCategories'
import { Category, Product, Question } from '../types'

type Action =
  | { type: 'start_round'; payload: Category[] }
  | { type: 'select_category'; payload: Category['id'] }
  | { type: 'set_products'; payload: Product[] }
  | { type: 'set_product_thumbnail'; payload: { index: number; url: string } }
  | { type: 'set_questions'; payload: Question[] }
  | { type: 'next_question' }
  | { type: 'select_product'; payload: Product['id'] }
  | { type: 'restart_round' }
  | { type: 'restart_game' }
  | { type: 'next_round'; payload: boolean }
type Dispatch = (action: Action) => void
export type State = {
  categories: Category[]
  selectedCategoryId: string | undefined
  products: Product[]
  selectedProductId: string | undefined
  questions: Question[]
  currentQuestionIndex: number
  questionResets: number
  round: number
  score: { correct: number; wrong: number; total: number }
  finished: boolean
}
type GameProviderProps = { children: React.ReactNode }

const GameStateContext = React.createContext<
  | {
      state: State
      dispatch: Dispatch
      getCategories: (amount: number) => Promise<Category[]>
    }
  | undefined
>(undefined)

function gameReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'start_round': {
      return {
        ...state,
        categories: action.payload
      }
    }
    case 'select_category': {
      return {
        ...state,
        selectedCategoryId: action.payload
      }
    }
    case 'set_products': {
      return {
        ...state,
        products: action.payload
      }
    }
    case 'set_questions': {
      return {
        ...state,
        questions: action.payload,
        currentQuestionIndex: 0
      }
    }
    case 'next_question': {
      return state.questionResets
        ? {
            ...state,
            currentQuestionIndex: state.currentQuestionIndex + 1,
            questionResets: state.questionResets - 1
          }
        : { ...state }
    }
    case 'select_product': {
      const score =
        state.questions[0].item_id === action.payload
          ? {
              ...state.score,
              correct: state.score.correct + 1,
              total: state.score.total + 1 + state.questionResets
            }
          : {
              ...state.score,
              wrong: state.score.wrong + 1,
              total: state.score.total
            }
      return {
        ...state,
        selectedProductId: action.payload,
        score
      }
    }
    case 'restart_round': {
      return {
        ...INITIAL_STATE,
        round: state.round,
        score: state.score,
        finished: state.finished
      }
    }
    case 'restart_game': {
      return INITIAL_STATE
    }
    case 'next_round': {
      const nextRound = state.round + 1
      return {
        ...INITIAL_STATE,
        score: state.score,
        round: nextRound,
        finished: nextRound >= ROUNDS
      }
    }
    case 'set_product_thumbnail': {
      if (!state.products.length) return state
      const productsCopy = [...state.products]
      productsCopy[action.payload.index].thumbnail = action.payload.url
      return {
        ...state,
        products: productsCopy
      }
    }
    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}

const INITIAL_STATE: State = {
  categories: [],
  selectedCategoryId: undefined,
  products: [],
  selectedProductId: undefined,
  questions: [],
  currentQuestionIndex: 0,
  questionResets: 2,
  round: 1,
  score: { correct: 0, wrong: 0, total: 0 },
  finished: false
}

const ROUNDS = 10

function GameProvider({ children }: GameProviderProps) {
  const { getCategories } = useCategories()
  const [state, dispatch] = React.useReducer(gameReducer, INITIAL_STATE)
  const value = { state, dispatch, getCategories }
  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  )
}

function useGame() {
  const context = React.useContext(GameStateContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}

export { GameProvider, useGame }
