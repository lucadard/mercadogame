import React, { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'

type Props = {}

const Lock = (props: Props) => {
  const { language } = useLanguage()
  const [showMessage, setShowMessage] = useState(false)
  return (
    <div className="grid place-content-center h-full bg-white shadow-sm hover:shadow-lg">
      <div
        className={`absolute translate-x-[320px] -translate-y-[20px] transition-opacity duration-200 pointer-events-none ${
          showMessage ? 'opacity-70' : 'opacity-0'
        }`}
      >
        <span className="absolute -left-[5px] -bottom-[15px] rotate-45 text-lg">
          ▼
        </span>
        <span className="bg-black text-white py-1 px-3 rounded-md whitespace-nowrap">
          {language === 'EN'
            ? 'You need to select a category first'
            : 'Primero tenes que seleccionar una categoria'}
          !
        </span>
      </div>
      <span
        className="material-symbols-outlined cursor-default"
        onMouseEnter={() => setShowMessage(true)}
        onMouseLeave={() => setShowMessage(false)}
      >
        lock
      </span>
    </div>
  )
}

export default Lock
