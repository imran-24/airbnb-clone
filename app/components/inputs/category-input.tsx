import React from 'react'
import { IconType } from 'react-icons/lib'

interface CategoryInputInterface{
    onClick: (value: string)=> void,
    selected?: boolean,
    label: string,
    icon: IconType
}
const CategoryInput: React.FC<CategoryInputInterface> = ({
    onClick,
    selected,
    label,
    icon: Icon
}) => {
  return (
    <div 
    onClick={()=> onClick(label)}
    className={`
    flex 
    items-center 
    justify-center
    px-3 
    py-2
    border-2
    transition
    cursor-pointer
    rounded-full
    gap-2
    hover:text-neutral-800
    ${selected ? 'border-neutral-800' : 'border-neutral-300'}
    ${selected ? 'text-neutral-800' : 'text-neutral-500'}
    
    `}>
        <Icon size={22} />
        <div className={`text-xs 
            ${selected ? 'font-bold' : 'font-medium'}
            `}>
            {label}
        </div>
    </div>
  )
}

export default CategoryInput