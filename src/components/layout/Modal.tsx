import React, { useEffect, useState } from 'react'
import { useModal } from '../../hooks/useModal'
import Button from '../Button'

type Props = {
  closeMessage?: string
}

const Modal = ({ closeMessage = 'Cerrar' }: Props) => {
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
      <div className="relative z-10 h-full grid place-content-center -mt-32 pointer-events-none">
        <div className="w-[500px] bg-white rounded-md flex flex-col justify-between items-center p-6 gap-4 pointer-events-auto">
          {modalComponent}
          <div>
            <Button action={closeModal}>
              <span>{closeMessage}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
