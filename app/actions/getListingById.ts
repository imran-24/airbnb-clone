import prisma from '@/app/libs/prismadb'
import { useSearchParams } from 'next/navigation'

interface Iparam{
    listingId: string
}

export default async function getListingById(params: Iparam) {
//     const params = useSearchParams()
//   const listingId =  params?.get('listingId') 
    const {listingId} = params

    try{
        const listing = await prisma.listing.findUnique({
            where:{
                id: listingId
            },
            include:{
                user: true
            }
        })

        if(!listing) return null
        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString() || null
            }
        }
    }
    catch(error: any){
        console.log(error)
    }

}