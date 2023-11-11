
import EmptyState from "@/app/components/EmptyState";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import TripsClient from "./PropertiesClient";
import getAllListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

export const dynamic = 'force-dynamic'

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      
    );
  }

  const listings = await getAllListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      
        <EmptyState
          title="No peroperties found"
          subtitle="Looks like you have no properties."
        />
      
    );
  }

  return (
    
      <PropertiesClient
        listings={listings}
        currentUser={currentUser}
        title="Properties"
        subtitle="List of properties"
      />
    
  );
}
 
export default PropertiesPage;