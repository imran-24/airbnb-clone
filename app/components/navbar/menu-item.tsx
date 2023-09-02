import Link from 'next/link'
import React from 'react'

interface MenuItemInterface{
    title: string,
    onclick: () => void
}

const MenuItem: React.FC<MenuItemInterface> = ({ title, onclick}) => {
  return (
    <div 
    className='px-4 py-2 cursor-pointer hover:bg-neutral-100 transition text-sm font-bold hover:'
    onClick={onclick}> 
        {title}  
    </div>
  )
}

export default MenuItem