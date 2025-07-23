'use client'

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Smartphone, Banknote, Bitcoin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const paymentMethods = [
  {
    name: "M-Pesa",
    description: "Pay instantly with M-Pesa",
    icon: <Smartphone className="h-8 w-8 text-primary" />,
  },
  {
    name: "Card",
    description: "Use your debit or credit card",
    icon: <CreditCard className="h-8 w-8 text-primary" />,
  },
  {
    name: "Crypto",
    description: "Pay with cryptocurrency",
    icon: <Bitcoin className="h-8 w-8 text-primary" />,
  },
    {
    name: "Bank Transfer",
    description: "Transfer from your bank",
    icon: <Banknote className="h-8 w-8 text-primary" />,
  },
];

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') || 'N/A';
  const price = searchParams.get('price') || 'N/A';
  const period = searchParams.get('period') || 'N/A';

  return (
    <div className="container mx-auto py-8">
       <Button variant="outline" asChild className="mb-4">
        <Link href="/#pricing">
          <ArrowLeft className="mr-2" />
          Back to Plans
        </Link>
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Choose Your Payment Method</CardTitle>
              <CardDescription>Select a secure way to complete your purchase.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <Button
                    key={method.name}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center justify-center gap-2 rounded-lg border-2 hover:border-primary hover:bg-accent transition-all duration-200"
                  >
                    {method.icon}
                    <span className="font-semibold">{method.name}</span>
                    <span className="text-xs text-muted-foreground">{method.description}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Selected Plan</span>
                  <span className="font-semibold">{plan}</span>
                </div>
                 <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Price</span>
                  <div className="flex items-baseline gap-1">
                     <span className="font-semibold text-lg">{price}</span>
                     <span className="text-xs text-muted-foreground">/{period}</span>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-primary">{price}</span>
                </div>
                <Button className="w-full">
                  Proceed to Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
