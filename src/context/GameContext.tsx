import * as React from 'react'
import useCategories from '../hooks/useCategories'
import { Category, Product, Question } from '../types'

type Action =
  | { type: 'initialize'; payload: Category[] }
  | { type: 'set_category'; payload: Category['id'] }
  | { type: 'set_products'; payload: Product[] }
  | { type: 'set_questions'; payload: Question[] }
  | { type: 'question_next' }
  | { type: 'choose_product'; payload: Product['id'] }
  | { type: 'round_next'; payload: boolean }
type Dispatch = (action: Action) => void
export type State = {
  categories: Category[]
  selectedCategoryId: string | undefined
  products: Product[]
  selectedProductId: string | undefined
  questions: Question[]
  questionResets: number
  round: number
  score: { correct: number; wrong: number; total: number }
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
    case 'initialize': {
      return {
        ...state,
        categories: action.payload
      }
    }
    case 'set_category': {
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
        questionResets: 0
      }
    }
    case 'question_next': {
      return {
        ...state,
        questionResets: state.questionResets + 1
      }
    }
    case 'choose_product': {
      const score =
        state.questions[state.questionResets]?.item_id === action.payload
          ? {
              ...state.score,
              correct: state.score.correct + 1,
              total: state.score.total + (3 - state.questionResets)
            }
          : {
              ...state.score,
              wrong: state.score.wrong + 1,
              total: state.score.total - 1
            }
      return {
        ...state,
        selectedProductId: action.payload,
        score
      }
    }
    case 'round_next': {
      const newRound = state.round + (action.payload ? 1 : 0)
      return { ...INITIAL_STATE, round: newRound, score: state.score }
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
  questionResets: 0,
  round: 1,
  score: { correct: 0, wrong: 0, total: 0 }
}

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
