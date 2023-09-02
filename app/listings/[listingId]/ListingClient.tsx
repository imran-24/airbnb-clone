'use client'

import { SafeListing, SafeReservation, SafeUser } from '@/app/types'
import React, { useMemo, useState, useCallback, useEffect } from 'react'
import ListingHead from '../../components/listings/ListingHead'
import ListingInfo from '@/app/components/listings/ListingInfo'
import { categories } from '@/app/utils'
import ListingReservation from '@/app/components/listings/ListingReservation'
import { differenceInDays, eachDayOfInterval } from 'date-fns'
import useLoginModal from '@/app/hooks/useLoginModal'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Range } from 'react-date-range'

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientInterface{
    reservations?: SafeReservation[],
    listing: SafeListing & {
        user: SafeUser
    },
    currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientInterface> = ({
    reservations = [],
    listing,
    currentUser
}) => {
    console.log(reservations);
    const loginModal = useLoginModal()
    const router = useRouter()

    const disabledDates = useMemo(()=>{
        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })

            dates = [...dates, ...range]
        })
        return dates

    },[reservations])

    const [isLoading, setIsLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)

    const category = useMemo(()=>{
        return categories.find(item => listing.category == item.label)
    },[categories, listing.category])

    const onCreateReservation = useCallback(()=>{
        if(!currentUser) loginModal.onOpen();

        setIsLoading(true);
        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
          })
          .then(() => {
            toast.success('Listing reserved!');
            setDateRange(initialDateRange);
            router.push('/trips');
          })
          .catch(() => {
            toast.error('Something went wrong.');
          })
          .finally(() => {
            setIsLoading(false);
          })
      },
      [
        totalPrice, 
        dateRange, 
        listing?.id,
        router,
        currentUser,
        loginModal
      ]);
    
      useEffect(()=>{
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInDays(
                dateRange.endDate,
                dateRange.startDate,
        )
    
            if(dayCount && listing.price){
                setTotalPrice(listing.price * dayCount)
            }else{
                setTotalPrice(listing.price)
            }
        }

      },[dateRange, listing.price])

  return (
    <div className='max-w-screen-lg mx-auto px-8 py-28'>
        <div className='w-full flex flex-col gap-8'>
            <ListingHead
            title={listing.title}
            currentUser={currentUser}
            imageSrc={listing.imageSrc}
            id={listing.id}
            locationValue={listing.locationValue}
            />
            <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10'>
                <ListingInfo
                user={listing.user}
                category={category}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                description={listing.description}
                bathroomCount={listing.bathroomCount}
                locationValue={listing.locationValue}
                />
                <div className='
                order-first
                md:order-last
                mb-10
                md:col-span-3
                '>
                <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
                </div>
            </div>

        </div>
    </div>
  )
}

export default ListingClient