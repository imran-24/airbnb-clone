import useCountries from '@/app/hooks/useCountries'
import { SafeUser } from '@/app/types'
import React from 'react'
import { IconType } from 'react-icons/lib'
import ListingCategory from './ListingCategory'
import Avater from '../avater'
import SelectMap from '../map'

interface ListingInfoInterface{
    user?: SafeUser | null,
    roomCount: number,
    bathroomCount: number,
    guestCount: number,
    category: {
        label: string,
        icon: IconType,
        description: string
    } | undefined,
    locationValue: string,
    description: string
}

const ListingInfo: React.FC<ListingInfoInterface> = ({
    user,
    roomCount,
    guestCount,
    bathroomCount,
    category,
    locationValue,
    description
}) => {
  const {getByValue} = useCountries()
  const location = getByValue(locationValue)
  return (
    <div className='
    col-span-4 flex flex-col gap-4
    '>
        <div className='
        flex flex-col gap-2
        '>
            <div className='
            text-lg
            font-semibold
            flex
            flex-row
            items-center
            gap-2
            '>
               <div>Hosted by {user?.name} </div> 
               <Avater
            //    imageSrc={user?.image}
               />
            </div>
            <div className='
            flex flex-row items-center gap-2 text-sm text-neutral-500
            '>
                <div>
                    {guestCount} guest
                </div>
                <div>
                    {roomCount} rooms
                </div>
                <div>
                    {bathroomCount} bathrooms
                </div>
            </div>
        </div>
        <hr />
        {category &&
            <ListingCategory
            icon={category.icon}
            label={category.label}
            description={category.description}
            />
        }
        <hr />
        <div className="font-light text-neutral-500">
            {description}
        </div>
        <hr />

        <SelectMap 
            value={location?.latlng}
        />
     </div>
  )
}

export default ListingInfo