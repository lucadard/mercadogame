import React from 'react'

const Footer = () => {
  return (
    <div className="border-t-[1px] border-gray-300 py-6 flex justify-center items-center bg-gray-400/10">
      <span className="mr-2">hecho por</span>
      <button className="border-[1px] min-h-fit py-1 sm:py-2 px-3 rounded-lg hover:border-mercadolibre-btn border-dashed border-black">
        <a href="https://github.com/lucadard" target="_blank">
          lucadard
        </a>
      </button>
    </div>
  )
}

export default Footer
