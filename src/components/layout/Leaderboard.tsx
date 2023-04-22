/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import api from '../../api'
import { LoadingDots, LoadingSpinner } from '../../assets/Loading'
import { useGame } from '../../context/GameContext'
import { useModal } from '../../hooks/useModal'
import { type Score } from '../../types'
import Button from '../Button'

export const SubmitScore = () => {
  const { state, dispatch } = useGame()
  const closeModal = useModal((state) => state.closeModal)
  const [scoreName, setScoreName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success', content: string }>()

  function handleRestartGame () {
    dispatch({ type: 'restart_game' })
    closeModal()
  }

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (scoreName === '' || isLoading) return setMessage({ type: 'error', content: 'No puede estar vacío.' })
    try {
      setIsLoading(true)
      await api.sendScore({ name: scoreName.slice(0, 4), score: state.score.total })
      setIsLoading(false)
      setMessage({ type: 'success', content: 'Puntuación enviada!' })
      setScoreName('')
      setIsAlreadySubmitted(true)
    } catch (err) {
      setIsLoading(false)
      setMessage({ type: 'error', content: 'Ocurrió un error. Intentá otra vez.' })
    }
  }

  return (
    <div className='flex flex-col items-center gap-8'>
      <p className='text-center text-2xl'>
        Tu puntuacion es de <span className='text-3xl font-bold'>{state.score.total}</span> puntos
      </p>
      <div>
        {!isAlreadySubmitted &&
          <form onSubmit={handleSubmit} className='md:flex md:items-center md:gap-2'>
            <label className='block text-lg md:flex md:items-baseline md:gap-2'>
              <p>Ingresa tu nombre:</p>
              <div className='relative my-2 flex flex-col md:my-0'>
                <input
                  type='text'
                  className='border py-2 pl-2'
                  value={scoreName}
                  onChange={(e) => {
                    setMessage(undefined)
                    setScoreName(e.target.value.toUpperCase().slice(0, 4))
                  }}
                />
              </div>
            </label>
            <Button disabled={isLoading}>
              <div className='grid h-6 w-12 place-content-center'>
                {isLoading ? <LoadingSpinner /> : <span>Enviar</span>}
              </div>
            </Button>
          </form>}
        {message && <p className={`mt-2 text-center text-lg ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>{message.content}</p>}
      </div>
      <Button action={handleRestartGame} disabled={isLoading} size='lg'>
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
    <div className='mx-auto mt-2 w-full max-w-4xl px-10 pb-10'>
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
                      {/* <th>date</th> */}
                    </tr>
                  </thead>
                  <tbody className='text-[#515151]'>
                    {leaderboard.map((item, i) => (
                      <tr key={i} className='h-14 border-t-[1px] border-gray-100'>
                        <td>{getNumberWithOrdinal(i + 1)}</td>
                        <td>{item.name}</td>
                        <td>{item.score}</td>
                        {/* <td>{new Date(item.createdAt).toLocaleDateString()}</td> */}
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
