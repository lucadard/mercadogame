import React from 'react'

type Props = {
  disabled?: boolean
  action?: (() => void) | null
  children: React.ReactNode
  style?: 'default' | 'dashed'
  active?: boolean
  size?: 'md' | 'lg'
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

const sizeStyles = {
  md: '',
  lg: 'text-2xl px-4'
}

const Button = ({
  disabled = false,
  action = null,
  children,
  style = 'default',
  active = false,
  size = 'md'
}: Props) => {
  return (
    <button
      className={`h-min rounded-lg px-3 py-2 
      ${styles[style]} 
      ${sizeStyles[size]} 
      ${active ? activeStyles[style] : ''}
      ${
        disabled
          ? 'pointer-events-none cursor-not-allowed opacity-50'
          : 'cursor-pointer'
      }`}
      // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
      onClick={() => action && action()}
    >
      {children}
    </button>
  )
}

export default Button
