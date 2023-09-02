'use client'
import React from 'react'

interface HeadingInterface{
    title: string,
    subtitle: string,
    center?: boolean,
    small?: boolean
}

const Heading: React.FC<HeadingInterface> = ({
    title,
    subtitle,
    center,
    small
}) => {
  return (
    <div className={`flex flex-col ${center ? 'items-center justify-center' : 'items-start'}`}>
        <p className={`${small && 'text-lg '} font-extrabold `}>
            {title}
        </p>
        <p className='text-sm text-neutral-500'>
            {subtitle}
        </p>
    </div>
  )
}

export default Heading