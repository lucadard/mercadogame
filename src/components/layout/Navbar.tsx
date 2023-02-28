import React, { useState } from 'react'
import { useModal } from '../../hooks/useModal'
import Button from '../Button'
import Score from '../Score'

const leaderboardModal = (
  <div>
    <p className="text-center">Nada que mostrar, todavia...</p>
  </div>
)

const Navbar = () => {
  const setModal = useModal((state) => state.setModal)
  const showModal = useModal((state) => state.showModal)

  return (
    <nav className="w-full bg-mercadolibre-primary grid grid-rows-2 lg:grid-rows-1 lg:grid-flow-col border-b-[1px] border-gray-300 py-2 px-10 gap-x-4 text-md lg:text-lg">
      {/* score */}
      <div className="row-start-2 lg:row-start-auto flex items-center">
        <Score />
      </div>
      {/* logo */}
      <a
        className="row-start-1 col-span-2 font-sans flex gap-2 items-center lg:justify-self-center"
        href="/"
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
      <div className="row-start-2 lg:row-start-1 place-self-end self-center">
        <Button
          action={() => setModal(leaderboardModal)}
          style={'dashed'}
          active={showModal}
        >
          <span>Tabla de posiciones</span>
        </Button>
      </div>
    </nav>
  )
}

export default Navbar
