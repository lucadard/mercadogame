import React from 'react'
import Button from '../Button'

const Footer = () => {
  return (
    <div className="border-t-[1px] border-gray-300 py-6 flex justify-center items-center bg-gray-400/10">
      <span className="mr-2">hecho por</span>
      <a href="https://github.com/lucadard" target="_blank">
        <Button style="dashed">lucadard</Button>
      </a>
    </div>
  )
}

export default Footer
