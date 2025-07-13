"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { optimizeHotspotLocationsAction } from "@/app/dashboard/optimize/actions"
import type { OptimizeHotspotLocationsOutput } from "@/ai/flows/hotspot-location-optimizer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Wand2 } from "lucide-react"

const formSchema = z.object({
  populationDensityData: z.string().min(10, "Please provide more details on population density."),
  usagePatternsData: z.string().min(10, "Please provide more details on usage patterns."),
  networkCoverageData: z.string().min(10, "Please provide more details on network coverage."),
  existingHotspotLocations: z.string().min(10, "Please list existing hotspot locations."),
})

export function HotspotOptimizerForm() {
  const [result, setResult] = useState<OptimizeHotspotLocationsOutput | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      populationDensityData: "",
      usagePatternsData: "",
      networkCoverageData: "",
      existingHotspotLocations: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setResult(null)
    try {
      const response = await optimizeHotspotLocationsAction(values)
      if (response) {
        setResult(response)
      } else {
        throw new Error("Received an empty response from the optimizer.")
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

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="populationDensityData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Population Density Data</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., High density in Market area, low in residential Zone B..." {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="usagePatternsData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usage Patterns Data</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Peak usage from 6 PM to 10 PM. High demand near the bus station..." {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="networkCoverageData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Network Coverage Data</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Weak signal in the southern part of the estate. No coverage past the river..." {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="existingHotspotLocations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Existing Hotspot Locations</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Main gate, shopping complex rooftop, community hall..." {...field} rows={4} />
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
            <p className="mt-2 text-muted-foreground">AI is analyzing the data...</p>
         </div>
      )}

      {result && (
        <div className="mt-12 space-y-8">
            <h3 className="text-xl font-bold font-headline">Optimization Results</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Suggested Locations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm whitespace-pre-wrap">{result.suggestedLocations}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Reasoning</CardTitle>
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
