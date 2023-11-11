'use client'
import React, {useCallback, useMemo} from 'react'
import {Listing, User, Reservation} from '@prisma/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import HeartButton from '../HeartButton'
import useCountries from '@/app/hooks/useCountries'

import Button from '../Button'
import { SafeListing, SafeUser } from '@/app/types'
import { format } from 'date-fns'

interface ListingCardInterface{
    data: SafeListing,
    currentUser: SafeUser | null | undefined,
    actionId?: string,
    disabled?: boolean,
    onAction?: (id: string)=> void,
    actionLabel?: string,  
    reservation?: Reservation
}

const ListingCard: React.FC<ListingCardInterface> = ({
    data,
    currentUser,
    disabled,
    onAction,
    actionId='',
    actionLabel,
    reservation,
}) => {
  const router = useRouter()
  const {getByValue} = useCountries()
  const location = getByValue(data.locationValue)

  const price = useMemo(()=>{
    if(reservation) return reservation.totalPrice
    return data.price
  },[reservation, data])

  // const reservationDate = useMemo(()=>{

  //   if(!reservation) return null
  //   const start = new Date(reservation.startDate)
  //   const end = new Date(reservation.endDate)
  //   return `${format(start, 'PP')} - ${format(end, 'PP')}`

  // },[reservation]) 

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId]);

  return (
    <div 
    onClick={()=> router.push(`/listings/${data.id}`)}
    className='group col-span-1 cursor-pointer'>
        <div className='flex flex-col gap-2 w-full'>
            <div className='
            w-full
            aspect-square
            overflow-hidden
            relative
            rounded-xl'>
                <Image
                alt='listing'
                src={data?.imageSrc}
                fill
                className='
                w-full
                h-full
                group-hover:scale-110
                transition
                object-cover
                '
                />
                <div className='absolute top-3 right-3 z-10'>
                <HeartButton 
                    currentUser={currentUser}
                    listingId={data.id}
                />
                </div>
            </div>
            <div className=" text-lg">
            {location?.region}, {location?.label}
            </div>
            <div className='text-xs text-neutral-400 font-semibold'>
                {data.category}
            </div>
            <div className='text-sm font-semibold flex items-center'>
                ${price}
                {!reservation && (
            <div className="pl-2 inline-flex font-semibold">night</div>
          )}
            </div>
            {onAction && actionLabel && (
           <Button
            disabled={disabled}
            small
            label={actionLabel} 
            onClick={handleCancel}
          />
        )}
        </div>
    </div>
  )
}

export default ListingCard