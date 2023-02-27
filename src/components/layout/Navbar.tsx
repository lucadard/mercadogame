import React, { useState } from 'react'
import Score from '../Score'
import Modal from './Modal'

type Props = {}

const Navbar = () => {
  const [isBtnClicked, setIsBtnClicked] = useState(false)

  return (
    <>
      {isBtnClicked && (
        <Modal action={() => setIsBtnClicked(false)}>
          <div>
            <p className="text-center">Nada que mostrar, todavia...</p>
          </div>
        </Modal>
      )}
      <nav className="w-full bg-mercadolibre-primary grid grid-rows-2 lg:grid-rows-1 lg:grid-flow-col border-b-[1px] border-gray-300 py-2 px-10 gap-y-2 gap-x-4 text-md lg:text-lg">
        {/* score */}
        <div className="row-start-2 lg:row-start-auto">
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
          <button
            className={`border-[1px] min-h-fit py-1 sm:py-2 px-3 rounded-lg hover:border-mercadolibre-btn  
        ${
          isBtnClicked
            ? 'outline outline-mercadolibre-btn border-solid border-mercadolibre-btn'
            : 'border-dashed border-black'
        }`}
            onClick={() => setIsBtnClicked(true)}
          >
            <span>Tabla de posiciones</span>
          </button>
        </div>
      </nav>
    </>
  )
}

export default Navbar
