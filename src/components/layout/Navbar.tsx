import React, { useEffect, useRef, useState } from 'react'
import Emoji from '../Emoji'
import HoverMessage from '../HoverMessage'
import Score from '../Score'
import Modal from './Modal'

type Props = {}

const Navbar = (props: Props) => {
  const [isBtnClicked, setIsBtnClicked] = useState(false)
  const [showMsg, setShowMsg] = useState(false)
  const [hoverMsgPos, setHoverMsgPos] = useState(0)

  const handleMouseHover = (position: number) => {
    if (!showMsg) setShowMsg(true)
    setHoverMsgPos(position)
  }

  return (
    <>
      {isBtnClicked && (
        <Modal action={() => setIsBtnClicked(false)}>
          <div>
            <p className="text-center">Nada que mostrar, todavia...</p>
          </div>
        </Modal>
      )}
      <nav className="bg-mercadolibre-primary grid grid-rows-2 lg:grid-rows-1 lg:grid-flow-col border-b-[1px] border-gray-300 py-2 px-10 gap-y-2 text-md lg:text-lg">
        <div className="row-start-2 lg:row-start-auto">
          <Score />
        </div>
        <div className="row-start-1 flex lg:justify-center">
          <a className="font-sans flex gap-2 items-center" href="/">
            <img
              src="/mercadogame.svg"
              alt="mercadogame logo"
              className="w-12 object-contain"
            />
            <h1 className="text-3xl lg:text-[42px] text-mercadolibre-logo">
              mercadogame
            </h1>
          </a>
        </div>
        <div className="row-start-1 relative flex ml-auto gap-4">
          <button
            className={`border-[1px] px-3 py-2 rounded-lg hover:border-mercadolibre-btn  
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
