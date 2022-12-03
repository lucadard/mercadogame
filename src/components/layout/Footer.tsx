import React from 'react'
import { useLanguage } from '../../context/LanguageContext'

type Props = {}

const Footer = (props: Props) => {
  const { language } = useLanguage()
  return (
    <div className="text-center pt-4 mt-auto mb-6">
      <span>
        {language === 'EN' ? 'made by' : 'hecho por'}
        <a
          href="https://github.com/lucadard"
          target="_blank"
          className="ml-2 border-[1px] w-[145px] px-3 py-2 rounded-lg hover:border-mercadolibre-btn border-dashed border-black"
        >
          lucadard
        </a>
      </span>
    </div>
  )
}

export default Footer
