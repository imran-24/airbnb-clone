'use client'

import {User } from '@prisma/client'

import React from 'react'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import usefavorite from '../hooks/useFavorites'
import { SafeUser } from '../types'

interface HeartButtonInterface{
    listingId: string,
    currentUser?: SafeUser | null
}

const HeartButton: React.FC<HeartButtonInterface> = ({
    listingId,
    currentUser
}) => {
  const {hasFavorited, toggleFavorite} = usefavorite({listingId, currentUser})
  

  return (
    <div 
    onClick={toggleFavorite}
    className='
        relative 
        cursor-pointer
        hover:opacity-80
        flex items-center justify-center
        transition 
        duration-150
    
        '>
        
        <IoHeartOutline size={22} className='
        text-white
          absolute 
        '/>
        
        <IoHeart size={20} className={`${hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'} transition 
        duration-150`}/>
                       
    </div>
  )
}

export default HeartButton