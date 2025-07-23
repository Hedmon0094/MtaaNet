"use server"

import { optimizeHotspotLocations, OptimizeHotspotLocationsInput } from "@/ai/flows/hotspot-location-optimizer";

export async function optimizeHotspotLocationsAction(input: OptimizeHotspotLocationsInput) {
    try {
        const result = await optimizeHotspotLocations(input);
        return result;
    } catch (error) {
        // For debugging, log the full error on the server
        console.error("Error in server action:", error);
        
        // Return a more structured error to the client
        return {
            error: "An unexpected error occurred during optimization. Please check the server logs."
        };
    }
}
