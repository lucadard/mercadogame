import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import api from '../../api'
import { LoadingDots, LoadingSpinner } from '../../assets/Loading'
import { useGame } from '../../context/GameContext'
import { useModal } from '../../hooks/useModal'
import { type Score } from '../../types'
import Button from '../Button'
import SingleCharacterInputForm from '../SingleCharacterInputForm'

export const SubmitScore = () => {
  const { state, dispatch } = useGame()
  const closeModal = useModal((state) => state.closeModal)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  function handleRestartGame () {
    dispatch({ type: 'restart_game' })
    closeModal()
  }

  async function handleSubmit (value: string) {
    if (value === '' || isLoading) return
    try {
      setIsLoading(true)
      await api.sendScore({ name: value, score: state.score.total })
      console.log('Score submited!')
      setIsLoading(false)
    } catch (err) {
      setError(
        'No nos pudimos conectar con el servidor, podés intentar otra vez.'
      )
      console.error('Error while submitting score.')
    }
    handleRestartGame()
  }
  return (
    <div className='flex flex-col items-center gap-2'>
      <p>
        Tu puntuacion es de <span>{state.score.total}</span> puntos
      </p>
      <p>Ingresa tu nombre:</p>
      <SingleCharacterInputForm
        length={5}
        onSubmit={handleSubmit}
        formStyles='flex gap-2 items-center'
      >
        <Button disabled={isLoading}>
          <div className='grid h-6 w-12 place-content-center'>
            {isLoading ? <LoadingSpinner /> : <span>Enviar</span>}
          </div>
        </Button>
      </SingleCharacterInputForm>
      {error && <p className='text-center text-red-600'>{error}</p>}
      <p>Sino, podés jugar de nuevo</p>
      <Button action={handleRestartGame} disabled={isLoading}>
        <span>Reiniciar juego</span>
      </Button>
    </div>
  )
}

function getNumberWithOrdinal (n: number) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return `${n}${(s[(v - 20) % 10] || s[v] || s[0])}`
}

export const Leaderboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [leaderboard, setLeaderboard] = useState<Score[]>([])
  const [error, setError] = useState('')
  useEffect(() => {
    // setIsLoading(true)
    api
      .getLeaderboard()
      .then(setLeaderboard)
      .finally(() => setIsLoading(false))
      .catch((err) => {
        setError('Error comunicándose con el servidor.')
        console.error('Could not fetch leaderboard.', err.message)
      })
  }, [])

  return (
    <div className='mx-auto mt-2 w-full max-w-4xl px-10'>
      <Link href='/'>
        <a className='text-[#515151]'>{'<'} Volver</a>
      </Link>
      {error
        ? (
          <div>
            <p className='mt-10 text-center text-2xl text-red-600'>{error}</p>
          </div>
          )
        : (
          <>
            <h2 className='my-4 text-xl font-extralight text-[#515151] lg:text-2xl'>
              High scores
            </h2>
            {!isLoading
              ? (
                <table className='w-full rounded-md bg-white text-center text-xl uppercase shadow-sm outline outline-[1px] outline-gray-100 hover:shadow-lg lg:text-2xl'>
                  <thead>
                    <tr className='h-14 font-semibold'>
                      <th>rank</th>
                      <th>name</th>
                      <th>score</th>
                    </tr>
                  </thead>
                  <tbody className='text-[#515151]'>
                    {leaderboard.map((item, i) => (
                      <tr key={i} className='h-14 border-t-[1px] border-gray-100'>
                        <td>{getNumberWithOrdinal(i + 1)}</td>
                        <td>{item.name}</td>
                        <td>{item.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                )
              : (
                <div className='flex w-full justify-center py-20'>
                  <LoadingDots />
                </div>
                )}
          </>
          )}
    </div>
  )
}
