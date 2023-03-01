import React, { ReactNode, useRef, useState } from 'react'

type Props = {
  length: number
  onSubmit: (value: string) => any
  formStyles?: string
  children: ReactNode
}

const SingleCharacterInputForm = ({
  length,
  onSubmit,
  children,
  formStyles
}: Props) => {
  const formRef = useRef<HTMLFormElement | null>(null)

  function focusPrevInput(currentInput: number) {
    if (!formRef.current || currentInput === 0) return
    const prevInput = formRef.current[currentInput - 1] as HTMLInputElement
    prevInput.focus()
  }
  function focusNextInput(currentInput: number) {
    if (!formRef.current || currentInput === length - 1) return
    const nextInput = formRef.current[currentInput + 1] as HTMLInputElement
    nextInput.focus()
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit(input.join(''))
  }

  const [input, setInput] = useState(new Array(length).fill(''))

  let inputs = []
  for (let i = 0; i < length; i++) {
    inputs.push(
      <input
        key={i}
        type="text"
        autoComplete="off"
        autoFocus={i === 0}
        maxLength={1}
        name={i.toString()}
        className="w-5 text-3xl h-full border-b-2 border-black outline-none"
        value={input[i]}
        onKeyDown={(e) => {
          if (e.key === 'Backspace') {
            input[i].length === 0
              ? focusPrevInput(i)
              : setInput((array) => {
                  array[i] = ''
                  return [...array]
                })
          }
          if (e.keyCode < 65 || e.keyCode > 90) return
          setInput((array) => {
            array[i] = e.key.toUpperCase()
            return [...array]
          })
          focusNextInput(i)
        }}
        onChange={(e) => {}}
      />
    )
  }
  return (
    <form ref={formRef} className={formStyles} onSubmit={handleSubmit}>
      <div className="flex gap-4 m-2">{inputs}</div>
      {children}
    </form>
  )
}

export default SingleCharacterInputForm
