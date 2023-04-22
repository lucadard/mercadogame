import CategoriesSection from './components/sections/categorySelection'
import QuestionSection from './components/sections/question'
import ProductsSection from './components/sections/products'
import NextRoundButton from './components/layout/NextRoundButton'
import { Route } from 'wouter'
import { Leaderboard } from './components/layout/Leaderboard'
import PageLayout from './PageLayout'
import { useEffect } from 'react'
import { useGame } from './context/GameContext'
import { animateScroll as scroll } from 'react-scroll'
function App () {
  const { state } = useGame()
  useEffect(() => {
    scroll.scrollToTop({ duration: 500 })
  }, [state.round])

  return (
    <PageLayout>
      <Route path='/'>
        <div className='h-full flex-1 px-10 pt-2 md:px-0'>
          <CategoriesSection />
          <QuestionSection />
          <ProductsSection />
        </div>
        <div className='mb-5 grid place-content-center'>
          <NextRoundButton />
        </div>
      </Route>
      <Route path='/leaderboard'>
        <div>
          <Leaderboard />
        </div>
      </Route>
    </PageLayout>
  )
}

export default App
