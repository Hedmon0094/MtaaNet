"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { optimizeHotspotLocationsAction } from "@/app/dashboard/optimize/actions"
import type { OptimizeHotspotLocationsOutput } from "@/ai/flows/hotspot-location-optimizer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2, Wand2, MapPin, Focus } from "lucide-react"

const formSchema = z.object({
  targetArea: z.string().min(3, "Please enter a valid target area, e.g., 'Kibera' or 'Mathare'."),
})

export function HotspotOptimizerForm() {
  const [result, setResult] = useState<OptimizeHotspotLocationsOutput | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [mapUrl, setMapUrl] = useState("")
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetArea: "",
    },
  })
  
  const getMapUrlForAllLocations = (locations: OptimizeHotspotLocationsOutput['suggestedLocations']) => {
    if (!locations || locations.length === 0) {
      return "";
    }

    const markers = locations.map(loc => `marker=${loc.lat},${loc.lng}`).join('&');
    
    const lats = locations.map(l => l.lat);
    const lngs = locations.map(l => l.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    
    const latPadding = (maxLat - minLat) * 0.1 || 0.01;
    const lngPadding = (maxLng - minLng) * 0.1 || 0.01;

    const bbox = `${minLng - lngPadding},${minLat - latPadding},${maxLng + lngPadding},${maxLat + latPadding}`;

    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&${markers}`;
  }
  
  const getMapUrlForSingleLocation = (lat: number, lng: number) => {
    return `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.01},${lat-0.01},${lng+0.01},${lat+0.01}&layer=mapnik&marker=${lat},${lng}`;
  }


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setResult(null)
    setMapUrl("")

    try {
      const response = await optimizeHotspotLocationsAction(values)
      if (response && response.suggestedLocations) {
        setResult(response)
        setMapUrl(getMapUrlForAllLocations(response.suggestedLocations))
      } else {
        throw new Error("Received an empty or invalid response from the optimizer.")
      }
    } catch (error) {
      console.error("Optimization error:", error)
      toast({
        variant: "destructive",
        title: "Optimization Failed",
        description: "An error occurred while analyzing the data. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleFocusClick = (lat: number, lng: number) => {
    setMapUrl(getMapUrlForSingleLocation(lat, lng));
  };


  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="max-w-md">
            <FormField
              control={form.control}
              name="targetArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Area</FormLabel>                   <FormControl>
                    <Input placeholder="e.g., Kibera, Mathare, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Optimize Locations
              </>
            )}
          </Button>
        </form>
      </Form>
      
      {isLoading && (
         <div className="mt-12 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-muted-foreground">AI is analyzing the data using its tools...</p>
         </div>
      )}

      {result && (
        <div className="mt-12 space-y-8">
            <h3 className="text-xl font-bold font-headline">Optimization Results</h3>
             <Card>
                <CardHeader>
                    <CardTitle>Map View</CardTitle>
                    <CardDescription>Visual representation of suggested hotspot locations.</CardDescription>
                </CardHeader>
                <CardContent>
                    {mapUrl && <iframe
                        key={mapUrl}
                        width="100%"
                        height="450"
                        className="rounded-lg border"
                        src={mapUrl}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>}
                </CardContent>
            </Card>
            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Suggested Locations</CardTitle>
                        <CardDescription>Recommended deployment points. Click the focus icon to view on map.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {result.suggestedLocations.map((location) => (
                           <div key={location.name} className="flex items-center justify-between gap-4 p-3 rounded-lg bg-muted/50">
                                <div className="flex items-start gap-4">
                                    <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold">{location.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                                        </p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => handleFocusClick(location.lat, location.lng)} aria-label={`Focus on ${location.name}`}>
                                    <Focus className="h-5 w-5 text-muted-foreground hover:text-primary" />
                                </Button>
                           </div>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Reasoning</CardTitle>
                        <CardDescription>The AI's justification for its suggestions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm whitespace-pre-wrap">{result.reasoning}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
      )}
    </div>
  )
}
