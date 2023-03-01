import React from 'react'

type Props = {
  disabled?: boolean
  action?: (() => void) | null
  children: React.ReactNode
  style?: 'default' | 'dashed'
  active?: boolean
}

const styles = {
  default:
    'bg-mercadolibre-btn hover:bg-mercadolibre-btn-hover text-white transition-colors duration-300',
  dashed:
    'border-[1px] border-dashed border-black hover:border-mercadolibre-btn'
}

const activeStyles = {
  default: 'opacity-50 pointer-events-none cursor-not-allowed',
  dashed:
    'outline outline-mercadolibre-btn border-mercadolibre-btn !border-solid'
}

const Button = ({
  disabled = false,
  action = null,
  children,
  style = 'default',
  active = false
}: Props) => {
  return (
    <button
      className={`py-2 px-3 rounded-lg 
      ${styles[style]} 
      ${active ? activeStyles[style] : ''}
      ${
        disabled
          ? 'opacity-50 pointer-events-none cursor-not-allowed'
          : 'cursor-pointer'
      }`}
      onClick={() => action && action()}
    >
      {children}
    </button>
  )
}

export default Button
