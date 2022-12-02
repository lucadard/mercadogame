import React, { useEffect, useState } from 'react'
import api from '../../api'
import { State, useGame } from '../../context/GameContext'

type Props = {
  id: string
  title: string
  thumbnail: string
  isVisible: boolean
  state: State
  onProductSelection: (id: string) => void
}

const Product = ({
  id,
  title,
  thumbnail,
  isVisible,
  state,
  onProductSelection
}: Props) => {
  const { questionResets } = useGame().state
  return (
    <div
      key={id}
      className={`z-10 relative min-w-[180px] select-none group
              ${isVisible ? 'animate-enter' : 'animate-exit'} 
               ${
                 state.selectedProductId === id
                   ? 'opacity-60 shadow-lg'
                   : 'hover:shadow-lg'
               }
               ${!state.selectedProductId ? 'cursor-pointer' : ''}
               `}
      onClick={() => onProductSelection(id)}
    >
      {state.selectedProductId &&
        id === state.questions[questionResets].item_id && (
          <div className="absolute w-full h-full grid place-content-center pointer-events-none">
            <span className="material-symbols-outlined scale-[4]">
              check_circle
            </span>
          </div>
        )}
      <div className="border-b-[1px] border-gray-200 bg-white rounded-md group-hover:shadow-none group-hover:rounded-b-none overflow-hidden transition-all duration-100">
        <img className="h-[180px]" src={thumbnail} alt={`Foto de ${title}`} />
      </div>
      <div
        className={`-z-10 w-full absolute p-3 -mt-[70px] rounded-b-md  bg-white transition-all duration-100 
                  ${
                    state.selectedProductId === id
                      ? 'mt-0 shadow-lg'
                      : 'group-hover:mt-0 group-hover:shadow-lg'
                  }
                  ${
                    state.selectedProductId &&
                    id === state.questions[questionResets].item_id
                      ? 'mt-0 shadow-lg'
                      : 'group-hover:mt-0 group-hover:shadow-lg'
                  }
                  `}
      >
        <p className="overflow-hidden max-h-10 text-ellipsis text-[13px] text-gray-600 transition-opacity opacity-100 group-hover:opacity-100 duration-100">
          {title}
        </p>
      </div>
    </div>
  )
}

export default Product
