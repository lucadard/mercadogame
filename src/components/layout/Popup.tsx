import React from 'react'
import { useLanguage } from '../../context/LanguageContext'

type Props = {
  action: (args: any) => any
  children: any
}

const Popup = ({ action, children }: Props) => {
  const { language } = useLanguage()
  return (
    <div className="z-[100] absolute w-full h-full overflow-hidden bg-black bg-opacity-50 grid place-content-center">
      <div className="-z-10 absolute bg-black bg-opacity-50" onClick={action} />
      <div className="w-[500px] bg-white rounded-md flex flex-col justify-between items-center p-6 gap-4">
        {children}
        <div>
          <button
            className="py-2 px-4 bg-mercadolibre-btn hover:bg-mercadolibre-btn-hover transition-colors duration-300 text-white rounded-lg"
            onClick={action}
          >
            {language === 'EN' ? 'Close' : 'Cerrar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Popup
