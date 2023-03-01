import React, { useEffect, useState } from 'react'
import { useModal } from '../../hooks/useModal'
import Button from '../Button'

const Modal = () => {
  const modalComponent = useModal((state) => state.component)
  const closeModal = useModal((state) => state.closeModal)
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
        onClick={closeModal}
      />
      <div className="flex justify-center items-center -mt-[10vh] h-full pointer-events-none px-10">
        <div className="relative w-full max-w-3xl rounded-md pointer-events-auto bg-white p-10 flex flex-col gap-4">
          {modalComponent}
          <div className="mx-auto">
            <Button action={closeModal}>
              <span>Volver</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
