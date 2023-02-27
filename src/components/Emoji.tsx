import React from 'react'

type Props = {
  name: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'w-5',
  md: 'w-10',
  lg: 'w-15'
}

const Emoji = ({ name, size = 'md' }: Props) => {
  return (
    <img
      src={`/emojis/${name}.png`}
      alt={`${name} emoji`}
      className={`${sizes[size]} aspect-square object-contain`}
    />
  )
}

export default Emoji
