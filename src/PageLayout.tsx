import React, { ReactNode } from 'react'
import { Route } from 'wouter'
import Footer from './components/layout/Footer'
import { Leaderboard } from './components/layout/Leaderboard'
import Modal from './components/layout/Modal'
import Navbar from './components/layout/Navbar'
import NextRoundButton from './components/layout/NextRoundButton'
import CategoriesSection from './components/sections/categorySelection'
import ProductsSection from './components/sections/products'
import QuestionSection from './components/sections/question'
import { useModal } from './hooks/useModal'

type Props = {
  children: ReactNode
}

const PageLayout = ({ children }: Props) => {
  const showModal = useModal((state) => state.showModal)

  return (
    <>
      {showModal && <Modal />}
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <Navbar />
        {children}
      </div>
      <Footer />
    </>
  )
}

export default PageLayout
