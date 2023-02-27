import React, { useState } from 'react'
import { useGame } from '../context/GameContext'

type Props = {}

const Score = (props: Props) => {
  const { state } = useGame()
  return (
    <div>
      <p>
        Ronda: <span>{state.round}</span>
      </p>
      <p>
        Puntuación: <span>{state.score.total}</span>
      </p>
    </div>
  )
}

export default Score
