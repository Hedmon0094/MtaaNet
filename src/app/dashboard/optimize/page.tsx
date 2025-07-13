import { HotspotOptimizerForm } from "@/components/dashboard/HotspotOptimizerForm";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function HotspotOptimizerPage() {
  return (
    <div className="container mx-auto py-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">AI Hotspot Optimizer</CardTitle>
          <CardDescription>
            Identify optimal locations for new hotspot deployment based on population density, usage patterns, and network coverage data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HotspotOptimizerForm />
        </CardContent>
      </Card>
    </div>
  );
}
