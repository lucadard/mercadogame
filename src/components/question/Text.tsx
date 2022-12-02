import React, { useState } from 'react'
import { useGame } from '../../context/GameContext'

type Props = {
  children: any
}

const Text = ({ children }: Props) => {
  const { state, dispatch } = useGame()

  const [showQuestion, setShowQuestion] = useState(false)
  const [animateRotation, setAnimateRotation] = useState(false)

  const handleResetQuestion = () => {
    dispatch({ type: 'question_next' })
    setAnimateRotation(true)
    setTimeout(() => {
      setAnimateRotation(false)
    }, 1000)
  }

  return (
    <>
      <div className="h-full relative group">
        {!showQuestion && (
          <div className="z-10 absolute top-0 left-0 w-full h-full grid place-content-center">
            <span
              className="material-symbols-outlined cursor-pointer"
              onClick={() => setShowQuestion(true)}
            >
              visibility
            </span>
          </div>
        )}

        <div className="py-4 bg-white shadow-sm group-hover:shadow-lg group">
          <p
            className={`text-lg px-4 text-center max-h-[30px] min-h-[30px] overflow-hidden duration-200 flex justify-center 
        ${
          !showQuestion
            ? 'blur-sm opacity-40 select-none'
            : 'group-hover:max-h-[90px]'
        }
        `}
          >
            {children}
          </p>
        </div>
      </div>
      <div
        className={`-z-10 absolute right-0 top-[48px] transition-transform duration-500
        ${
          state.questionResets >= 2 || state.selectedProductId
            ? 'opacity-30 pointer-events-none'
            : ''
        }
        ${showQuestion ? 'translate-x-[35px]' : ''}
        `}
        onClick={handleResetQuestion}
      >
        <span
          className={`material-symbols-outlined cursor-pointer select-none text-[30px] 
          ${animateRotation ? 'animate-rotate' : ''}
          `}
        >
          refresh
        </span>
      </div>
    </>
  )
}

export default Text
