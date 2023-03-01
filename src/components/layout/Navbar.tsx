import { Link, useLocation } from 'wouter'
import { useModal } from '../../hooks/useModal'
import Button from '../Button'
import Score from '../Score'
import { Leaderboard } from './Leaderboard'

const Navbar = () => {
  const [location, setLocation] = useLocation()

  return (
    <nav className="bg-mercadolibre-primary grid grid-rows-2 lg:grid-rows-1 grid-cols-2 lg:grid-cols-4 py-2 px-10 text-md lg:text-lg border-b-[1px] border-gray-300">
      {/* score */}
      <div className="row-start-2 lg:row-start-1 col-start-1 flex items-center">
        <Score />
      </div>
      {/* logo */}
      <a
        href="/"
        className="row-start-1 col-span-2 font-sans flex gap-2 items-center lg:justify-self-center"
      >
        <img
          src="/mercadogame.svg"
          alt="mercadogame logo"
          className="w-12 object-contain"
        />
        <h1 className="text-3xl lg:text-[42px] text-mercadolibre-logo">
          mercadogame
        </h1>
      </a>
      {/* leaderboard */}
      <div className="row-start-2 lg:row-start-1 col-start-2 lg:col-start-4 place-self-end self-center">
        <Button
          action={() => setLocation('/leaderboard')}
          style={'dashed'}
          active={location === '/leaderboard'}
        >
          <span>Tabla de posiciones</span>
        </Button>
      </div>
    </nav>
  )
}

export default Navbar
