/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import { useGame } from '../../context/GameContext'
import { useModal } from '../../hooks/useModal'
import Button from '../Button'
import { SubmitScore } from './Leaderboard'

type Props = {}

const NextRoundButton = (props: Props) => {
  const { state, dispatch } = useGame()
  const showModal = useModal((state) => state.showModal)
  const setModal = useModal((state) => state.setModal)

  async function handleNextRound () {
    dispatch({ type: 'next_round', payload: true })
  }
  async function handleFinishGame () {
    setModal(<SubmitScore />)
  }
  return state.finished
    ? (
      <Button
        disabled={!state.selectedProductId}
        active={showModal}
        action={handleFinishGame}
      >
        <span>Finalizar juego</span>
      </Button>
      )
    : (
      <Button
        disabled={!state.selectedProductId}
        action={handleNextRound}
      >
        <span>Siguiente Ronda</span>
      </Button>
      )
}

export default NextRoundButton
