import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Container from "@/app/components/container";
import getReservations from "@/app/actions/getReservations";
//  this is a server components we cant use any hooks in the components 

interface Iparam{
    listingId: string
}

export default async function ListingsPage({params}: {params:Iparam}) {
    
    const listing = await getListingById(params)
    const reservations = await getReservations(params)
    
    const currentUser = await getCurrentUser()
    if(!listing){
        return (<Container>
            <EmptyState />
        </Container>)
    }
    return(
        
        <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
        />
        
    )
}