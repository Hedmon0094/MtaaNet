import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Wifi, Smartphone, Users, Clock, Mail, Calendar, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Feature = {
  text: string;
  icon: keyof typeof ICONS;
};

type PlanProps = {
  title: string;
  price: string;
  period: string;
  description: string;
  features: Feature[];
  isFeatured?: boolean;
};

const ICONS = {
    Wifi: Wifi,
    Smartphone: Smartphone,
    Users: Users,
    Clock: Clock,
    Mail: Mail,
    Calendar: Calendar,
    Zap: Zap,
    ShieldCheck: ShieldCheck,
    Star: Star
} as const;

export function PlanCard({ title, price, period, description, features, isFeatured = false }: PlanProps) {
  return (
    <Card className={cn(
        "flex flex-col hover:shadow-lg transition-all duration-300 relative overflow-hidden",
        isFeatured && "border-primary border-2 shadow-primary/20 scale-105"
    )}>
        {isFeatured && (
            <Badge className="absolute top-4 right-4 flex items-center gap-1">
                <Star className="h-4 w-4" />
                Most Popular
            </Badge>
        )}
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
            {features.map(({text, icon}) => {
                const Icon = ICONS[icon];
                return (
                    <li key={text} className="flex items-center gap-3 text-sm">
                        <Icon className="h-5 w-5 text-primary" />
                        <span>{text}</span>
                    </li>
                );
            })}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className={cn("w-full", isFeatured && "shadow-lg shadow-primary/50 hover:shadow-primary/40 transition-shadow")} asChild>
            <Link href={`/dashboard/payment?plan=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}&period=${encodeURIComponent(period)}`}>Get Plan</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
