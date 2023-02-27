import React from 'react'
import { useGame } from '../../../context/GameContext'
import Emoji from '../../Emoji'
import { ICONS } from '.'

type Props = {
  id: string
  name: string
  onCategorySelection: (id: string) => void
}

const Category = ({ id, name, onCategorySelection }: Props) => {
  const { selectedCategoryId } = useGame().state
  return (
    <div
      key={id}
      className={`grid grid-rows-2 p-4 border-[1px] border-gray-100 ${
        !selectedCategoryId
          ? 'hover:bg-blue-500 hover:text-white cursor-pointer'
          : id === selectedCategoryId && 'bg-blue-500 text-white'
      }`}
      onClick={() => onCategorySelection(id)}
    >
      <div className="flex justify-center items-end">
        <Emoji name={ICONS[id]} />
      </div>
      <span className="text-center text-[15px]">{name}</span>
    </div>
  )
}

export default Category
