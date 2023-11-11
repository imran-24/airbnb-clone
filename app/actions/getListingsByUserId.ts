import prisma from '@/app/libs/prismadb'

export interface IListingInterface{
    userId: string
}

export default async function getAllListingsByUserId(params: IListingInterface) {
    try{
        // const {userId} = params
        let query: any = {}
        if(params?.userId) {query.userId = params?.userId}
        const listings = await prisma.listing.findMany({
            where: query,
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