import React, { useEffect, useState } from 'react'
import api from '../../../api'
import { LoadingSpinner } from '../../../assets/Loading'
import { State, useGame } from '../../../context/GameContext'

type Props = {
  id: string
  title: string
  isVisible: boolean
  state: State
  onProductSelection: (id: string) => void
}

const ProductCard = ({
  id,
  title,
  isVisible,
  state,
  onProductSelection
}: Props) => {
  const { questionResets } = useGame().state
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [thumbnail, setThumbnail] = useState('')

  const userHasSelected = Boolean(state.selectedProductId)
  const isSelected = id === state.selectedProductId
  const isCorrectAnswer =
    state.selectedProductId && id === state.questions[questionResets].item_id

  useEffect(() => {
    api
      .getProductPicture(id)
      .then(setThumbnail)
      .finally(() => setIsImageLoading(false))
  }, [])

  return (
    <div className="h-[250px]">
      <div
        className={`relative w-[180px] transition-all group bg-white rounded-md overflow-hidden 
        ${userHasSelected ? '' : 'cursor-pointer'}
        ${
          isSelected || isCorrectAnswer
            ? 'shadow-lg'
            : 'max-h-[180px] hover:max-h-[250px] shadow-sm hover:shadow-lg'
        }
        `}
        onClick={() => !userHasSelected && onProductSelection(id)}
      >
        {isCorrectAnswer && (
          <div className="absolute top-0 left-0 h-[180px] w-full flex justify-center items-center pointer-events-none">
            <span
              className={`material-symbols-outlined text-9xl ${
                isCorrectAnswer && isSelected ? 'text-green-600' : ''
              }`}
            >
              check_circle
            </span>
          </div>
        )}
        {isImageLoading ? (
          <div className="w-full aspect-square grid place-content-center">
            <LoadingSpinner />
          </div>
        ) : (
          <img
            className={`w-full aspect-square object-contain 
            ${isSelected || isCorrectAnswer ? 'opacity-30' : ''}`}
            src={thumbnail}
            alt={`Foto de ${title}`}
          />
        )}
        <div
          className={`transition-all duration-300 overflow-hidden 
        ${
          isSelected || isCorrectAnswer
            ? 'max-h-14'
            : 'max-h-0 group-hover:max-h-14'
        }`}
        >
          <div className="h-[1px] bg-gray-400/30" />
          <div
            className={`p-2 px-3 transition-all group-hover:delay-200 group-hover:duration-200 duration-100 text-ellipsis text-[13px] text-gray-600 
          ${
            isSelected || isCorrectAnswer
              ? 'opacity-70'
              : 'opacity-0 group-hover:opacity-100'
          }`}
          >
            <p className="max-h-10 overflow-hidden">{title}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
