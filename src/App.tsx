import api from './api'
import { useEffect, useState } from 'react'

import CategoriesSection from './components/sections/categorySelection'
import QuestionSection from './components/sections/question'
import ProductsSection from './components/sections/products'

import { useGame } from './context/GameContext'
import Navbar from './components/layout/Navbar'
import Modal from './components/layout/Modal'
import Footer from './components/layout/Footer'
import { useModal } from './hooks/useModal'
import Button from './components/Button'

function App() {
  const { state, dispatch, getCategories } = useGame()
  const { showModal, setModal } = useModal()
  const [isLoading, setIsLoading] = useState({
    categories: false,
    products: false,
    question: false
  })

  useEffect(() => {
    setCategories()
  }, [])

  function setCategories() {
    getCategories(3).then((payload) =>
      dispatch({ type: 'initialize', payload })
    )
  }

  async function setQuestion() {
    if (state.questions.length || state.selectedProductId) return
    setIsLoading((prev) => ({ ...prev, question: true }))
    const randomProductId =
      state.products[Math.floor(Math.random() * state.products.length)].id
    const questions = await api.getQuestionsByProductId(randomProductId, 3)
    setIsLoading((prev) => ({ ...prev, question: false }))
    if (questions === undefined) {
      console.log('no hay preguntas disponibles, reiniciando ronda...')
      setModal(
        <div className="flex flex-col gap-4 items-center">
          <p className="text-center">
            Hubo un error y la ronda se va a reiniciar.
          </p>
          <span>Hace click en el boton para continuar.</span>
        </div>
      )
    }
    dispatch({ type: 'set_questions', payload: questions! })
  }

  useEffect(() => {
    if (!state.products.length) return
    setQuestion()
  }, [state.products])

  async function handleNextRound() {
    if (!state.selectedProductId) return
    dispatch({ type: 'round_next', payload: true })
    dispatch({ type: 'initialize', payload: await getCategories(3) })
  }

  return (
    <>
      {showModal && <Modal />}
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="px-10 md:px-0 pt-2 h-full flex-1">
          <CategoriesSection />
          <QuestionSection isLoading={isLoading.question} />
          <ProductsSection
            isLoading={isLoading.products}
            setIsLoading={setIsLoading}
          />
        </div>
        <div className="grid place-content-center mb-5">
          <Button
            disabled={!Boolean(state.selectedProductId)}
            action={handleNextRound}
          >
            <span>Siguiente Ronda</span>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
