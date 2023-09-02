'use client'

import {useState, useCallback} from 'react'
import { SafeListing, SafeReservation, SafeUser } from '../types'
import Container from '../components/container'
import Heading from '../components/Heading'
import ListingCard from '../components/listings/ListingCard'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'

interface PropertiesClientProps {
    listings: SafeListing[],
    currentUser?: SafeUser | null,
    title: string,
    subtitle: string
  }
  
  const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings,
    currentUser, title, subtitle
  }) => {

  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onDelete = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/listings/${id}`)
    .then(() => {
      toast.success('Listing deleted');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);
  
  return (
    <div className='w-full mx-auto py-28'>
    <Container>
      <Heading
        title={title}
        subtitle={subtitle}
      />
      <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
    </div>
  )
}

export default PropertiesClient