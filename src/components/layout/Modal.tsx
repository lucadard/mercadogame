import React, { useEffect, useState } from 'react'

type Props = {
  action: (args: any) => any
  closeMessage?: string
  children: any
}

const Modal = ({ action, children, closeMessage = 'Cerrar' }: Props) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <div
      className={`z-[100] fixed left-0 top-0 h-screen w-screen transition-opacity duration-300 
      ${mounted ? '' : 'opacity-0'}`}
    >
      <div
        className="bg-black absolute bg-opacity-50 w-full h-full select-none"
        onClick={action}
      />
      <div className="relative z-10 h-full grid place-content-center -mt-32 pointer-events-none">
        <div className="w-[500px] bg-white rounded-md flex flex-col justify-between items-center p-6 gap-4 pointer-events-auto">
          {children}
          <div>
            <button
              className="py-2 px-4 bg-mercadolibre-btn hover:bg-mercadolibre-btn-hover transition-colors duration-300 text-white rounded-sm"
              onClick={action}
            >
              {closeMessage}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
