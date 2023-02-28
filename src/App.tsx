import CategoriesSection from './components/sections/categorySelection'
import QuestionSection from './components/sections/question'
import ProductsSection from './components/sections/products'

import { useGame } from './context/GameContext'
import Navbar from './components/layout/Navbar'
import Modal from './components/layout/Modal'
import Footer from './components/layout/Footer'
import { useModal } from './hooks/useModal'
import Button from './components/Button'
import { SubmitScore } from './components/layout/Leaderboard'
import { useEffect } from 'react'
import api from './api'
import NextRoundButton from './components/layout/NextRoundButton'

function App() {
  const showModal = useModal((state) => state.showModal)

  useEffect(() => {
    console.log('Attempting to wake up db...')
    api
      .wakedb()
      .then(() => console.log('%cSuccess!', 'color: green'))
      .catch((err) => console.error('Could not connect with db.'))
  }, [])

  return (
    <>
      {showModal && <Modal />}
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="px-10 md:px-0 pt-2 h-full flex-1">
          <CategoriesSection />
          <QuestionSection />
          <ProductsSection />
        </div>
        <div className="grid place-content-center mb-5">
          <NextRoundButton />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
