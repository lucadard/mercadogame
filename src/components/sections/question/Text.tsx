import React, { useState } from 'react'

type Props = {
  children: any
}

const Text = ({ children }: Props) => {
  const [showQuestion, setShowQuestion] = useState(false)

  return (
    <div className='group relative h-full'>
      {!showQuestion && (
        <div className='absolute left-0 top-0 z-10 grid h-full w-full place-content-center'>
          <span
            className='material-symbols-outlined cursor-pointer'
            onClick={() => setShowQuestion(true)}
          >
            visibility
          </span>
        </div>
      )}
      <div className='group bg-white py-4 shadow-sm group-hover:shadow-lg'>
        <p
          className={`flex max-h-[30px] min-h-[30px] justify-center overflow-hidden px-4 text-center text-lg duration-200 
        ${
          !showQuestion
            ? 'select-none opacity-40 blur-sm'
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
