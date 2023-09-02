'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'
import { IconType } from 'react-icons/lib'
import qs from 'query-string'


interface CategoryBoxInterface{
    label: string,
    icon: IconType,
    selected?: boolean  
}

const CategoryBox: React.FC<CategoryBoxInterface> = ({
    label,
    selected,
    icon : Icon

}) => {
  const router = useRouter()
  const params = useSearchParams()
 
//   const handleClick = useCallback(()=>{
//     let currentQuery = {}
//     if(params){
//       currentQuery = qs.parse(params.toString())
//     }
//     const updatedQuery: any = {
//       ...currentQuery,
//       category: label
//     } 
//     if(params?.get('category') == label){
//       delete updatedQuery.category
//     }

//     const url = qs.stringifyUrl({
//       url: '/',
//       query: updatedQuery
//     },{ skipNull: true})

//     router.push(url)
//   },[params, label, router])

  return (
    <div 
    // onClick={handleClick}
    className={`
    flex 
    flex-col 
    items-center 
    justify-center
    p-3
    border-b-2
    transition
    cursor-pointer
    gap-2
    hover:text-neutral-800
    ${selected ? 'border-b-neutral-800' : 'border-transparent'}
    ${selected ? 'text-neutral-800' : 'text-neutral-500'}
    `}>
        <Icon size={22} />
        <div className='text-xs font-medium'>
            {label}
        </div>
    </div>
  )
}

export default CategoryBox