import api from './api'
import { useEffect, useState } from 'react'

import CategoriesSection from './components/sections/categorySelection'
import QuestionSection from './components/sections/question'
import ProductsSection from './components/sections/products'

import { useGame } from './context/GameContext'
import Score from './components/Score'
import Next from './components/Next'
import Navbar from './components/layout/Navbar'
import Modal from './components/layout/Modal'
import Footer from './components/layout/Footer'

function App() {
  const { state, dispatch, getCategories } = useGame()
  const [isLoading, setIsLoading] = useState({
    categories: false,
    products: false,
    question: false
  })
  const [displayErrorPopup, setDisplayErrorPopup] = useState(false)

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
      return setDisplayErrorPopup(true)
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
      {displayErrorPopup && (
        <Modal
          action={() => {
            setDisplayErrorPopup(false)
            dispatch({ type: 'round_next', payload: false })
            setCategories()
          }}
        >
          <div className="flex flex-col gap-4 items-center">
            <p className="text-center">
              Hubo un error y la ronda se va a reiniciar.
            </p>
            <span>Hace click en el boton para continuar.</span>
          </div>
        </Modal>
      )}
      <main className="overflow-hidden h-screen gap-4 flex flex-col bg-mercadolibre-secondary">
        <Navbar />
        <div className="flex flex-col gap-4">
          <CategoriesSection></CategoriesSection>
          <QuestionSection isLoading={isLoading.question}>
            <h3 className="font-medium pl-3">
              2.Hace click para revelar la pregunta:
            </h3>
          </QuestionSection>
          <ProductsSection
            isLoading={isLoading.products}
            setIsLoading={setIsLoading}
          >
            <h3 className="font-medium pl-3 w-[600px] mx-auto">
              3.Analiza y elegi tu respuesta:
            </h3>
          </ProductsSection>
          <section className="absolute top-64 h-[200px] w-full overflow-hidden">
            <Score />
            <Next onNextRound={handleNextRound} />
          </section>
        </div>
        <Footer />
      </main>
    </>
  )
}

export default App
