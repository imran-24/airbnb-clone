'use client'
import Heading from '@/app/components/Heading'
import useCountries from '@/app/hooks/useCountries'
import { SafeUser } from '@/app/types'
import Image from 'next/image'
import React from 'react'
import { IconType } from 'react-icons/lib'
import HeartButton from '../HeartButton'

interface ListingHeadInterface{
    currentUser?: SafeUser | null,
    title: string,
    id: string,
    locationValue: string,
    imageSrc: string
}

const ListingHead: React.FC<ListingHeadInterface> = ({
    currentUser,
    id,
    locationValue,
    imageSrc,
    title
}) => {
  const {getByValue} = useCountries()
  const location = getByValue(locationValue)


  return (
    <>
      <Heading
      title={title}
      subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className='
      w-full
      h-[60vh]
      rounded-lg
      relative
      
      '>
        <Image
        fill
        alt="Image"
        src={imageSrc}
        className='object-cover rounded-lg w-full h-full'
        />
        <div className='top-5 right-5 absolute'>
          <HeartButton
          listingId={id}
          currentUser={currentUser}
          />
        </div>
      </div>
      
    </>
  )
}

export default ListingHead