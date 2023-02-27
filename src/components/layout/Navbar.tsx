import React, { useEffect, useRef, useState } from 'react'
import Emoji from '../Emoji'
import HoverMessage from '../HoverMessage'
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
      <nav className="bg-mercadolibre-primary grid grid-cols-3 items-center border-b-[1px] border-gray-300">
        <div></div>
        <div className="flex justify-center py-6">
          <a className="font-sans flex gap-2 items-center" href="/">
            <img
              src="/mercadogame.svg"
              alt="mercadogame logo"
              className="w-14 object-contain"
            />
            <h1 className="text-5xl text-mercadolibre-logo">mercadogame</h1>
          </a>
        </div>
        <div className="relative flex ml-auto px-10 gap-4">
          <button
            className={`border-[1px] px-3 py-2 rounded-lg hover:border-mercadolibre-btn  
        ${
          isBtnClicked
            ? 'outline outline-mercadolibre-btn border-solid border-mercadolibre-btn'
            : 'border-dashed border-black'
        }`}
            onClick={() => setIsBtnClicked(true)}
          >
            Tabla de posiciones
          </button>
        </div>
      </nav>
    </>
  )
}

export default Navbar
