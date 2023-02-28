import { useGame } from '../../../context/GameContext'

import Lock from './LockIcon'
import Text from './Text'
import { LoadingSpinner } from '../../../assets/Loading'
import { useEffect, useState } from 'react'
import api from '../../../api'
import { useModal } from '../../../hooks/useModal'

const errorModal = (
  <div className="flex flex-col gap-4 items-center">
    <p className="text-center text-xl">Hubo un error y la ronda se reinició.</p>
  </div>
)

const QuestionSection = () => {
  const { state, dispatch } = useGame()
  const setModal = useModal((state) => state.setModal)
  const [animateRotate, setAnimateRotate] = useState(false)

  useEffect(() => {
    if (!state.products.length) return
    const randomProduct =
      state.products[Math.floor(Math.random() * state.products.length)]
    api
      .getQuestionsByProductId(randomProduct.id, 3)
      .then((payload) => {
        if (!payload) throw new Error('Not enough questions')
        dispatch({ type: 'set_questions', payload })
      })
      .catch((err) => {
        console.log(err.message)
        dispatch({ type: 'restart_round' })
        setModal(errorModal)
      })
  }, [state.products])

  const handleResetQuestion = () => {
    dispatch({ type: 'next_question' })
    setAnimateRotate(true)
    setTimeout(() => {
      setAnimateRotate(false)
    }, 1000)
  }

  const isQuestion = state.questions.length
  const isNextQuestion = state.questionResets && isQuestion

  const renderChildren = () => {
    if (!isQuestion) return <Lock />
    return <Text children={state.questions[state.currentQuestionIndex].text} />
  }

  return (
    <section className="z-20 relative flex flex-col gap-2 max-w-[600px] mx-auto h-[100px] mb-9 md:mb-4">
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
