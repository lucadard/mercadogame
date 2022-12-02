import React, { useState } from 'react'
import { useGame } from '../context/GameContext'

type Props = {}

const Score = (props: Props) => {
  const { state } = useGame()
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => setExpanded((prev) => !prev)
  return (
    <div className="z-[90] absolute w-[150px] h-[130px] -translate-x-[90%] md:translate-x-0 hover:translate-x-0 transition-transform duration-300 group">
      <div
        className="z-50 absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 hover:shadow-md bg-white text-mercadolibre-btn w-[50px] h-[50px] rounded-full grid place-content-center cursor-pointer border-[1px]"
        onClick={toggleExpanded}
      >
        <span
          className={`material-symbols-outlined select-none cursor-pointer w-full text-center text-3xl first-letter duration-300 transition-transform 
          ${expanded ? '-rotate-180' : ''}`}
        >
          expand_more
        </span>
      </div>
      <div className="absolute -left-0 bg-white rounded-r-md shadow-sm hover:shadow-md border-r-[1px] border-gray-300 h-full w-full overflow-hidden">
        <div
          className={`absolute w-full h-full transition-transform duration-500 
        ${expanded ? '-translate-y-[130px]' : ''}`}
        >
          <div className="w-full h-full text-center pt-4">
            <span className="text-3xl">Score: </span>
            <span className="text-2xl">{state.score.total}</span>
            <div className='h-4'/>
            <span className="text-2xl">Round: </span>
            <span className="text-xl">{state.round}</span>
          </div>
          <div className="w-full h-full grid grid-cols-2 pt-4">
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl select-none">
                done
              </span>
              <span className="text-xl">{state.score.correct}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl select-none">
                close
              </span>
              <span className="text-xl">{state.score.wrong}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Score
