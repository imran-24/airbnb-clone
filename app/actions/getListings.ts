import prisma from '@/app/libs/prismadb'

export interface IListingInterface{
    userId: string
}
export default async function getAllListings(params: IListingInterface) {
    try{
        const {userId} = params
        let query: any = {}
        if(userId) {query.userId = userId}
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
    }

}