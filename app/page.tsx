import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import getAllListings, { IListingInterface } from './actions/getListings'
import getCurrentUser from './actions/getCurrentUser'
import Container from './components/container'
import EmptyState from './components/EmptyState'
import ListingCard from './components/listings/ListingCard'

const inter = Inter({ subsets: ['latin'] })

interface HomeProps{
  searchParams: IListingInterface
}
const Home = async({ searchParams}: HomeProps) => {
  console.log(searchParams)
  const listings = await getAllListings(searchParams)
  const isEmpty = listings?.length == 0
  const currentUser = await getCurrentUser()

  if(isEmpty){
    return (
    <Container>
      <EmptyState showReset/>
    </Container>)
  }

  return (
    <Container >
    <div 
    className='
    lg:pt-40
    pt-48
  
    grid 
    grid-cols-1 
    sm:grid-cols-2 
    md:grid-cols-3 
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-6
    gap-8
    '>
     
        {
          listings?.map(listing => (
            
            <ListingCard
            key={listing.id}
            currentUser={currentUser}
            data={listing}
            actionId={listing.id}
            />
          
          ))
        }
      
    </div>
  </Container>
  )
}

export default Home