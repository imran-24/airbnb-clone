import prisma from '@/app/libs/prismadb'

export interface IListingInterface{
    userId: string
}

export default async function getAllListings() {
    try{       
        const listings = await prisma.listing.findMany({
           
            orderBy:{
                createdAt: 'desc'
            }
        })
        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
          }));
      
          return safeListings;
    }
    catch(error: any){
        console.log(error)
        throw new Error(error);
    }

}