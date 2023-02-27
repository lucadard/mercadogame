import React, { useState } from 'react'

type Props = {
  children: any
}

const Text = ({ children }: Props) => {
  const [showQuestion, setShowQuestion] = useState(false)

  return (
    <div className="h-full relative group">
      {!showQuestion && (
        <div className="z-10 absolute top-0 left-0 w-full h-full grid place-content-center">
          <span
            className="material-symbols-outlined cursor-pointer"
            onClick={() => setShowQuestion(true)}
          >
            visibility
          </span>
        </div>
      )}
      <div className="py-4 bg-white shadow-sm group-hover:shadow-lg group">
        <p
          className={`text-lg px-4 text-center max-h-[30px] min-h-[30px] overflow-hidden duration-200 flex justify-center 
        ${
          !showQuestion
            ? 'blur-sm opacity-40 select-none'
            : 'group-hover:max-h-[90px]'
        }
        `}
        >
          {children}
        </p>
      </div>
    </div>
  )
}

export default Text
