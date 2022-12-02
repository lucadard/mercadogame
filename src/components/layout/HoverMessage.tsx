import React from 'react'

type Props = {
  show: boolean
  message: string
  positions: string[]
  currentPosition: number
}

const HoverMessage = ({ show, message, positions, currentPosition }: Props) => {
  return (
    <div
      className={`z-100 pointer-events-none absolute ml-2 -mt-4 flex flex-col items-center transition-all duration-300 
      ${show ? 'opacity-70 delay-500' : 'opacity-0'} 
      ${positions[currentPosition]}`}
    >
      <span className="-rotate-90 scale-150 translate-y-4 translate-x-2 self-start">
        ➤
      </span>
      <span className="bg-black text-white rounded-md py-2 px-4">
        {message}
      </span>
    </div>
  )
}

export default HoverMessage
