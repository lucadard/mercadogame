import { useGame } from '../../../context/GameContext'

import Lock from './LockIcon'
import Text from './Text'
import { LoadingSpinner } from '../../../assets/Loading'
import { useState } from 'react'

type Props = {
  isLoading: boolean
}

const QuestionSection = ({ isLoading }: Props) => {
  const { state, dispatch } = useGame()
  const [animateRotate, setAnimateRotate] = useState(false)

  const handleResetQuestion = () => {
    dispatch({ type: 'question_next' })
    setAnimateRotate(true)
    setTimeout(() => {
      setAnimateRotate(false)
    }, 1000)
  }

  const currentQuestion = state.questions[state.questionResets]
  const isNextQuestion = currentQuestion && state.questionResets < 2

  const renderChildren = () => {
    if (!currentQuestion) return <Lock />

    return (
      <Text
        children={
          isLoading ? <LoadingSpinner size={25} /> : currentQuestion.text
        }
      />
    )
  }

  return (
    <section className="z-20 relative flex flex-col gap-2 max-w-[600px] mx-auto h-[100px] mb-4">
      <div className="flex items-center gap-2">
        <h3 className="font-medium pl-3">
          2. Hace click para revelar la pregunta:
        </h3>
        <span
          className={`material-symbols-outlined cursor-pointer select-none text-lg transition-opacity duration-500 
          ${animateRotate ? 'animate-rotate' : ''}
          ${!isNextQuestion ? 'pointer-events-none opacity-0' : ''}
          
          `}
          onClick={handleResetQuestion}
        >
          refresh
        </span>
      </div>
      <div className="min-h-[62px]">{renderChildren()}</div>
    </section>
  )
}

export default QuestionSection
