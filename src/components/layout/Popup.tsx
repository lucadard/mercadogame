import React from 'react'
import { useLanguage } from '../../context/LanguageContext'

type Props = {
  action: (args: any) => any
  closeMessages?: { EN: string; ES: string }
  children: any
}

const Popup = ({
  action,
  children,
  closeMessages = { EN: 'Close', ES: 'Cerrar' }
}: Props) => {
  const { language } = useLanguage()
  return (
    <>
      <div
        className="z-[99] bg-black absolute bg-opacity-50 w-full h-full backdrop-blur-xs select-none"
        onClick={action}
      />
      <div className="z-[100] absolute w-full h-full grid place-content-center -mt-32 pointer-events-none">
        <div className="w-[500px] bg-white rounded-md flex flex-col justify-between items-center p-6 gap-4 pointer-events-auto">
          {children}
          <div>
            <button
              className="py-2 px-4 bg-mercadolibre-btn hover:bg-mercadolibre-btn-hover transition-colors duration-300 text-white rounded-sm"
              onClick={action}
            >
              {closeMessages[language]}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Popup
