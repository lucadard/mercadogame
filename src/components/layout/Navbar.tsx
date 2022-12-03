import React, { useEffect, useRef, useState } from 'react'
import { Emoji } from 'react-apple-emojis'
import { useLanguage } from '../../context/LanguageContext'
import HoverMessage from './HoverMessage'
import Popup from './Popup'

type Props = {}

const Navbar = (props: Props) => {
  const [isBtnClicked, setIsBtnClicked] = useState(false)
  const [showMsg, setShowMsg] = useState(false)
  const [hoverMsgPos, setHoverMsgPos] = useState(0)
  const { language, setLanguage } = useLanguage()

  const handleMouseHover = (position: number) => {
    if (!showMsg) setShowMsg(true)
    setHoverMsgPos(position)
  }

  return (
    <>
      {isBtnClicked && (
        <Popup action={() => setIsBtnClicked(false)}>
          <div>
            <p className="text-center">
              {language === 'EN'
                ? 'I have nothing to write here yet 🤔'
                : 'No se me ocurre que poner aca todavia 🤔'}
            </p>
          </div>
        </Popup>
      )}
      <nav className="bg-mercadolibre-primary grid grid-cols-3 items-center border-b-[1px] border-gray-300">
        <div className="z-[20] relative flex mr-auto px-10 gap-4">
          <HoverMessage
            message={
              language === 'ES'
                ? 'But only the instructions change!'
                : 'Pero solo cambian las instrucciones!'
            }
            show={showMsg}
            positions={['translate-y-12', 'translate-y-12 translate-x-16']}
            currentPosition={hoverMsgPos}
          />
          <div className="flex gap-4">
            <button
              className={`border-[1px] px-3 py-2 rounded-lg hover:border-mercadolibre-btn 
            ${
              language === 'ES'
                ? 'outline outline-mercadolibre-btn border-solid border-mercadolibre-btn'
                : 'border-dashed border-black'
            }`}
              onClick={() => {
                language === 'EN' ? setLanguage('ES') : null
                setShowMsg(false)
              }}
              onMouseEnter={() => language === 'EN' && handleMouseHover(0)}
              onMouseLeave={() => language === 'EN' && setShowMsg(false)}
            >
              ES
            </button>
            <button
              className={`border-[1px] px-3 py-2 rounded-lg hover:border-mercadolibre-btn 
            ${
              language === 'EN'
                ? 'outline outline-mercadolibre-btn border-solid border-mercadolibre-btn'
                : 'border-dashed border-black'
            }`}
              onClick={() => {
                language === 'ES' ? setLanguage('EN') : null
                setShowMsg(false)
              }}
              onMouseEnter={() => language === 'ES' && handleMouseHover(1)}
              onMouseLeave={() => language === 'ES' && setShowMsg(false)}
            >
              EN
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <h1 className="text-5xl p-6 text-mercadolibre-logo">
            <a className="font-sans flex gap-2" href="/">
              <Emoji className="w-10 h-10" name="joystick" />
              <span>mercadogame</span>
            </a>
          </h1>
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
            {language === 'EN' ? 'How it works?' : 'Como funciona?'}
          </button>
        </div>
      </nav>
    </>
  )
}

export default Navbar
