import React, { useEffect, useState } from 'react'
import { LoadingSpinner } from '../../../assets/Loading'
import { useGame } from '../../../context/GameContext'
import Emoji from '../../Emoji'
import { icons } from './iconsData'

type Props = {
  id: string
  name: string
  onCategorySelection: (id: string) => void
}

const Category = ({ id, name, onCategorySelection }: Props) => {
  const [mounted, setMounted] = useState(false)
  const { selectedCategoryId } = useGame().state

  useEffect(() => {
    // force "loading" state when round starts
    setTimeout(() => {
      setMounted(true)
    }, 500)
  }, [id])

  return (
    <div
      className={`grid grid-rows-2 p-4 border-[1px] border-gray-100 ${
        !selectedCategoryId
          ? 'hover:bg-blue-500 hover:text-white cursor-pointer'
          : id === selectedCategoryId && 'bg-blue-500 text-white'
      }`}
      onClick={() => onCategorySelection(id)}
    >
      {mounted ? (
        <>
          <div className="flex justify-center items-end">
            <Emoji name={icons[id as keyof typeof icons]} />
          </div>
          <span className="text-center text-[15px] mt-2">{name}</span>
        </>
      ) : (
        <div className="flex justify-center items-end">
          <LoadingSpinner size={40} />
        </div>
      )}
    </div>
  )
}

export default Category
