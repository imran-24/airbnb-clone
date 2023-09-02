import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";


export async function POST(request: Request){
    const body = await request.json();
    const {
        title,
        description, 
        imageSrc, 
        category,  
        roomCount, 
        bathroomCount, 
        guestCount, 
        location, 
        price } = body

    const currentUser = await getCurrentUser()

    if(!currentUser?.id){
        return NextResponse.error()
    }
    
    Object.keys(body).forEach((value: any)=>{
        if(!body[value]){
            return NextResponse.error()
        }
    })
        const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category ,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            userId: currentUser.id, 
            price: parseInt(price, 10), 
        }
    })
    return NextResponse.json(listing)
  }