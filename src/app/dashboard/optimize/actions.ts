"use server"

import { optimizeHotspotLocations, OptimizeHotspotLocationsInput } from "@/ai/flows/hotspot-location-optimizer";

export async function optimizeHotspotLocationsAction(input: OptimizeHotspotLocationsInput) {
    try {
        const result = await optimizeHotspotLocations(input);
        return result;
    } catch (error) {
        console.error("Error in server action:", error);
        return null;
    }
}
