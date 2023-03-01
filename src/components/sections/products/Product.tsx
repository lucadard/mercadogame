import React, { useEffect, useState } from 'react'
import api from '../../../api'
import { LoadingSpinner } from '../../../assets/Loading'
import { State, useGame } from '../../../context/GameContext'
import { isMobile } from 'react-device-detect'

type Props = {
  id: string
  title: string
  index: number
  onProductSelection: (id: string) => void
}

const ProductCard = ({ id, title, onProductSelection, index }: Props) => {
  const { state, dispatch } = useGame()
  const [isImageLoading, setIsImageLoading] = useState(
    () => !state.products[index].thumbnail
  )

  const userHasSelected = Boolean(state.selectedProductId)
  const isSelected = id === state.selectedProductId
  const isCorrectAnswer =
    state.selectedProductId &&
    id === state.questions[state.questionResets].item_id

  const isThumbnailFetched = state.products[index].thumbnail
  useEffect(() => {
    if (isThumbnailFetched) return
    api
      .getProductPicture(id)
      .then((url) =>
        dispatch({ type: 'set_product_thumbnail', payload: { index, url } })
      )
      .finally(() => setIsImageLoading(false))
  }, [id])

  return (
    <div className="h-[220px] sm:h-[250px] w-[140px] sm:w-[180px]">
      {isImageLoading ? (
        <div className="w-full aspect-square grid place-content-center">
          <LoadingSpinner size={50} />
        </div>
      ) : (
        <div
          className={`relative transition-all group bg-white rounded-md overflow-hidden 
        ${userHasSelected ? '' : 'cursor-pointer'}
        ${isSelected ? 'shadow-lg' : ''}
        ${
          isSelected || isCorrectAnswer || isMobile
            ? ''
            : 'max-h-[180px] hover:max-h-[250px] shadow-sm hover:shadow-lg'
        }
        `}
          onClick={() => !userHasSelected && onProductSelection(id)}
        >
          {isCorrectAnswer && (
            <div className="absolute top-0 left-0 lg:h-[180px] w-full flex justify-center items-center pointer-events-none">
              <span
                className={`material-symbols-outlined text-9xl ${
                  isCorrectAnswer && isSelected ? 'text-green-600' : ''
                }`}
              >
                check_circle
              </span>
            </div>
          )}
          <img
            className={`w-full aspect-square object-contain 
            ${isSelected || isCorrectAnswer ? 'opacity-30' : ''}`}
            src={state.products[index].thumbnail}
            alt={`Foto de ${title}`}
          />
          <div
            className={`transition-all duration-300 overflow-hidden 
        ${
          isSelected || isCorrectAnswer || isMobile
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
              : isMobile
              ? 'opacity-100'
              : 'opacity-0 group-hover:opacity-100'
          }`}
            >
              <p className="max-h-10 overflow-hidden">{title}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductCard
