import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import api from '../../api'
import { LoadingDots } from '../../assets/Loading'
import { useGame } from '../../context/GameContext'
import { useModal } from '../../hooks/useModal'
import { Score } from '../../types'
import Button from '../Button'
import SingleCharacterInputForm from '../SingleCharacterInputForm'

export const SubmitScore = () => {
  const { state, dispatch } = useGame()
  const closeModal = useModal((state) => state.closeModal)

  function handleRestartGame() {
    dispatch({ type: 'restart_game' })
    closeModal()
  }

  async function handleSubmit(value: string) {
    if (value === '') return
    try {
      await api.sendScore({ name: value, score: state.score.total })
      console.log('Score submited!')
    } catch (err) {
      console.error('Error while submitting score :(')
    }
    handleRestartGame()
  }
  return (
    <div className="flex flex-col items-center gap-2">
      <p>
        Tu puntuacion es de <span>{state.score.total}</span> puntos
      </p>
      <p>Ingresa tu nombre:</p>
      <SingleCharacterInputForm
        length={5}
        onSubmit={handleSubmit}
        formStyles={'flex gap-4'}
      >
        <Button>
          <span>Enviar</span>
        </Button>
      </SingleCharacterInputForm>
      <p>Sino, podés jugar de nuevo</p>
      <Button action={handleRestartGame}>
        <span>Reiniciar juego</span>
      </Button>
    </div>
  )
}

function getNumberWithOrdinal(n: number) {
  var s = ['th', 'st', 'nd', 'rd'],
    v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export const Leaderboard = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [leaderboard, setLeaderboard] = useState<Score[]>([])
  useEffect(() => {
    setIsLoading(true)
    api
      .getLeaderboard()
      .then(setLeaderboard)
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="px-10 mt-2 w-full max-w-4xl mx-auto">
      <Link href="/">
        <a className="text-[#515151]">{'<'} Volver</a>
      </Link>
      <h2 className="text-[#515151] text-xl lg:text-2xl font-extralight mt-4 mb-4">
        High scores
      </h2>
      {!isLoading ? (
        <table className="uppercase text-center text-xl lg:text-2xl w-full bg-white rounded-md outline outline-[1px] outline-gray-100 shadow-sm hover:shadow-lg">
          <thead>
            <tr className="h-14 font-semibold">
              <th>rank</th>
              <th>name</th>
              <th>score</th>
            </tr>
          </thead>
          <tbody className="text-[#515151]">
            {leaderboard.map((item, i) => (
              <tr key={i} className="border-t-[1px] border-gray-100 h-14">
                <td>{getNumberWithOrdinal(i + 1)}</td>
                <td>{item.name}</td>
                <td>{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="w-full py-20 flex justify-center">
          <LoadingDots />
        </div>
      )}
    </div>
  )
}
