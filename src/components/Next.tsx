import React from 'react'
import { useGame } from '../context/GameContext'

type Props = {
  onNextRound: () => void
  disabled?: boolean
}

const Next = ({ onNextRound, disabled = true }: Props) => {
  return (
    <button
      className={`my-3 p-3 bg-mercadolibre-btn text-white rounded-lg 
      ${
        disabled
          ? 'bg-gray-400 opacity-80 pointer-events-none cursor-not-allowed'
          : 'cursor-pointer'
      }`}
      onClick={onNextRound}
    >
      Siguiente Ronda
    </button>
  )
}

export default Next
