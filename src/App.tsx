import api from './api'
import { useEffect, useState } from 'react'

import CategoriesSection from './components/categories/Section'
import QuestionSection from './components/question/Section'
import ProductsSection from './components/products/Section'

import { useGame } from './context/GameContext'
import Score from './components/Score'
import Next from './components/Next'
import Navbar from './components/layout/Navbar'
import Popup from './components/layout/Popup'
import { useLanguage } from './context/LanguageContext'
import Footer from './components/layout/Footer'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const { state, dispatch, getCategories } = useGame()
  const { language } = useLanguage()
  const [isLoading, setIsLoading] = useState({
    categories: false,
    products: false,
    question: false
  })
  const [displayErrorPopup, setDisplayErrorPopup] = useState(false)

  const [displayWelcomePopup, setDisplayWelcomePopup] = useState(false)

  const {
    storedValue: showWelcomeMsgOnStart,
    setValue: setShowWelcomeMsgOnStart
  } = useLocalStorage('showWelcomeMessage', true)

  useEffect(() => {
    showWelcomeMsgOnStart && setDisplayWelcomePopup(true)
  }, [])

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
      {displayWelcomePopup && (
        <Popup
          action={() => {
            setDisplayWelcomePopup(false)
          }}
          closeMessages={{ EN: 'Start playing', ES: 'Comenzar a jugar' }}
        >
          <div className="flex flex-col gap-4 items-center">
            <p className="text-center">
              {language === 'EN' ? 'Welcome' : 'Bienvenido'}!
            </p>
            <span className="flex gap-2 items-center">
              {language === 'EN'
                ? 'Not show this message again'
                : 'No mostrar otra vez este mensaje'}
              <input
                type="checkbox"
                checked={!showWelcomeMsgOnStart}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setShowWelcomeMsgOnStart(!e.target.checked)
                }}
              />
            </span>
          </div>
        </Popup>
      )}
      {displayErrorPopup && (
        <Popup
          action={() => {
            setDisplayErrorPopup(false)
            dispatch({ type: 'round_next', payload: false })
            setCategories()
          }}
        >
          <div className="flex flex-col gap-4 items-center">
            <p className="text-center">
              {language === 'EN'
                ? 'There was an error fetching the data and the round will be restarted'
                : 'Hubo un error y la ronda se va a reiniciar'}
              .
            </p>
            <span>
              {language === 'EN'
                ? 'Please click the button to continue'
                : 'Hace click en el boton para continuar'}
              .
            </span>
          </div>
        </Popup>
      )}
      <main className="h-screen gap-4 flex flex-col bg-mercadolibre-secondary">
        <Navbar />
        <div className="flex flex-col gap-4">
          <CategoriesSection>
            <h3 className="font-medium pl-3">
              1.
              {language === 'EN'
                ? ' Select a category'
                : ' Selecciona una categoria'}
              :
            </h3>
          </CategoriesSection>
          <QuestionSection isLoading={isLoading.question}>
            <h3 className="font-medium pl-3">
              2.
              {language === 'EN'
                ? ' Click to unveil the question'
                : ' Hace click para revelar la pregunta'}
              :
            </h3>
          </QuestionSection>
          <ProductsSection
            isLoading={isLoading.products}
            setIsLoading={setIsLoading}
          >
            <h3 className="font-medium pl-3 w-[600px] mx-auto">
              3.
              {language === 'EN'
                ? ' Analize and choose your pick'
                : ' Analiza y elegi tu respuesta'}
              :
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
