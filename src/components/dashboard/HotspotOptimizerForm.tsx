"use client"

import { useState } from "react"
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
import { Loader2, Wand2, MapPin } from "lucide-react"

const formSchema = z.object({
  targetArea: z.string().min(3, "Please enter a valid target area, e.g., 'Kibera' or 'Mathare'."),
})

export function HotspotOptimizerForm() {
  const [result, setResult] = useState<OptimizeHotspotLocationsOutput | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetArea: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setResult(null)
    try {
      const response = await optimizeHotspotLocationsAction(values)
      if (response && response.suggestedLocations) {
        setResult(response)
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
  
  const getMapUrl = () => {
    if (!result || !result.suggestedLocations || result.suggestedLocations.length === 0) {
      return "";
    }

    const locations = result.suggestedLocations;
    const markers = locations.map(loc => `marker=${loc.lat},${loc.lng}`).join('&');
    
    // Calculate bounding box
    const lats = locations.map(l => l.lat);
    const lngs = locations.map(l => l.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    
    // Add some padding to the bounding box
    const latPadding = (maxLat - minLat) * 0.1;
    const lngPadding = (maxLng - minLng) * 0.1;

    const bbox = `${minLng - lngPadding},${minLat - latPadding},${maxLng + lngPadding},${maxLat + latPadding}`;

    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&${markers}`;
  }

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
                    <iframe
                        width="100%"
                        height="450"
                        className="rounded-lg border"
                        src={getMapUrl()}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </CardContent>
            </Card>
            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Suggested Locations</CardTitle>
                        <CardDescription>Recommended deployment points with coordinates.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {result.suggestedLocations.map((location) => (
                           <div key={location.name} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                                <MapPin className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <p className="font-semibold">{location.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                                    </p>
                                </div>
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
