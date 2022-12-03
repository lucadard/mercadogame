import React from 'react'
import { Emoji } from 'react-apple-emojis'
import { useGame } from '../context/GameContext'

type Props = {
  onNextRound: () => void
}

const Next = ({ onNextRound }: Props) => {
  const { state } = useGame()
  return (
    <div
      className={`z-[90] absolute right-0 grid place-content-center overflow-hidden shadow-sm hover:shadow-lg rounded-l-md transition-transform duration-1000 cursor-pointer ease-in-out 
      ${!state.selectedProductId ? 'translate-x-full' : ''}`}
    >
      <div
        className="select-none bg-white px-10 py-8 flex gap-2"
        onClick={onNextRound}
      >
        <Emoji className="w-10" name="right-arrow"></Emoji>
        <Emoji className="w-10" name="right-arrow"></Emoji>
        <Emoji className="w-10" name="right-arrow"></Emoji>
      </div>
    </div>
  )
}

export default Next
