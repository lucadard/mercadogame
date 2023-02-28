import { ReactNode } from 'react'
import { create } from 'zustand'

interface ModalState {
  component: ReactNode
  showModal: boolean
  closeModal: () => void
  setModal: (data: ReactNode) => void
}

export const useModal = create<ModalState>()((set) => ({
  component: <></>,
  showModal: false,
  closeModal: () =>
    set((state) => ({
      ...state,
      component: <></>,
      showModal: false
    })),
  setModal: (data) =>
    set((state) => ({
      ...state,
      component: <>{data}</>,
      showModal: true
    }))
}))
