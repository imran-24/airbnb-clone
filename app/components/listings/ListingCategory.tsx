import React from 'react'
import { IconType } from 'react-icons/lib'

interface ListingCategoryInterface{
    icon: IconType,
    label: string,
    description: string
}

const ListingCategory: React.FC<ListingCategoryInterface> = ({
    icon: Icon,
    label,
    description
}) => {
  return (
    <div>
        <div className='flex items-center gap-4'>
            <div>
                <Icon size={36} />
            </div>
            <div className='flex flex-col '>
                <div className='font-semibold'>
                    {label}
                </div>
                <div className=' text-neutral-500'>
                    {description}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ListingCategory