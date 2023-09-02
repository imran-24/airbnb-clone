'use client'
import React from 'react'
import { IconType } from 'react-icons/lib'

interface ButtonInterface{
    label: string,
    onClick:(e: React.MouseEvent<HTMLButtonElement>)=> void,
    disabled?: boolean,
    small?: boolean,
    outline?: boolean,
    icon?: IconType
}
const Button: React.FC<ButtonInterface> = ({
    label,
    outline,
    small,
    onClick,
    disabled,
    icon : Icon
}) => {
  return (
    <button
    onClick={onClick}
    disabled={disabled}
    className={
        `transition disabled:opacity-70  disabled:cursor-not-allowed rounded-lg font-semibold
        flex items-center justify-center gap-3
        ${disabled ? "cursor-not-allowed" : ''}
        ${small ? 'text-sm' : 'text-base'}
        ${small ? 'w-auto' : 'w-full'}
        ${small ? 'px-8' : 'px-16'}
        py-2
        ${outline ? 'border-2' : ''}
        ${outline ? 'text-black border-black font-extrabold' : 'text-white'}
        ${outline ? 'bg-transparent' : 'bg-rose-500'}
        ${outline ? 'hover:bg-black hover:text-white' : 'hover:bg-rose-600'}
        `
    }>
        {label}
        {
            Icon &&
            <div className='absolute left-10 '>
                <Icon size={20} />
            </div>
        }

    </button>
  )
}

export default Button