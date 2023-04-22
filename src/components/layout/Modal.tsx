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
      className={`fixed left-0 top-0 z-[100] h-screen w-screen transition-opacity duration-300 
      ${mounted ? '' : 'opacity-0'}`}
    >
      <div
        className='absolute h-full w-full select-none bg-black/50'
        onClick={closeModal}
      />
      <div className='pointer-events-none mt-[-10vh] flex h-full items-center justify-center px-10'>
        <div className='pointer-events-auto relative flex w-full max-w-3xl flex-col gap-4 rounded-md bg-white p-10'>
          <div onClick={() => closeModal()} className='absolute right-0 top-0 m-2 cursor-pointer p-2 hover:opacity-50'>╳</div>
          {modalComponent}
        </div>
      </div>
    </div>
  )
}

export default Modal
