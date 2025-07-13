import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

type PlanProps = {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
};

export function PlanCard({ title, price, period, description, features }: PlanProps) {
  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold font-headline">{price}</span>
            <span className="text-muted-foreground">/{period}</span>
        </div>
        <ul className="mt-6 space-y-2">
            {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Get Plan</Button>
      </CardFooter>
    </Card>
  );
}
