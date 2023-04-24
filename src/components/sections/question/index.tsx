import { useGame } from '../../../context/GameContext'

import Lock from './LockIcon'
import Text from './Text'
import { useEffect, useState } from 'react'
import api from '../../../api'
import { useModal } from '../../../hooks/useModal'

const errorModal = (
  <div className='flex flex-col items-center gap-4'>
    <p className='text-center text-xl'>Ningún producto tiene suficientes preguntas para poder jugar, se va a reiniciar la ronda.</p>
  </div>
)

const QuestionSection = () => {
  const { state, dispatch } = useGame()
  const setModal = useModal((state) => state.setModal)
  const [animateRotate, setAnimateRotate] = useState(false)

  useEffect(() => {
    const selectedProductsId: string[] = []
    if (!state.products.length || state.questions.length) return

    async function fetchQuestions () {
      const filteredProducts = state.products.filter(p => !selectedProductsId.includes(p.id))
      const randomProduct = filteredProducts[Math.floor(Math.random() * filteredProducts.length)]
      selectedProductsId.push(randomProduct.id)
      const questions = await api.getQuestionsByProductId(randomProduct.id, 3)
      if (!questions) throw new Error(`Not enough questions in product ${randomProduct.id}`)
      return questions
    }
    async function fetchRepeatedly () {
      try {
        const payload = await fetchQuestions()
        dispatch({ type: 'set_questions', payload })
      } catch (err) {
        if (selectedProductsId.length === state.products.length) {
          dispatch({ type: 'restart_round' })
          setModal(errorModal)
          console.error('No product has questions', err)
        } else await fetchRepeatedly()
      }
    }
    void fetchRepeatedly()
  }, [state.products.length])

  const isRoundFinished = Boolean(state.selectedProductId)
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
    return <Text>{state.questions[state.currentQuestionIndex].text}</Text>
  }

  return (
    <section className='relative z-20 mx-auto mb-9 flex h-[100px] max-w-[600px] flex-col gap-2 md:mb-4'>
      <div className='flex items-center gap-2'>
        <h3 className='pl-3 font-medium'>
          2. Hace click para revelar la pregunta:
        </h3>
        <span
          className={`material-symbols-outlined cursor-pointer select-none text-lg transition-opacity duration-500 
          ${animateRotate ? 'animate-rotate' : ''}
          ${!isNextQuestion || isRoundFinished ? 'pointer-events-none opacity-0' : ''}
          
          `}
          onClick={handleResetQuestion}
        >
          refresh
        </span>
      </div>
      <div className='min-h-[62px]'>{renderChildren()}</div>
    </section>
  )
}

export default QuestionSection
