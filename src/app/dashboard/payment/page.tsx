
'use client'

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Smartphone, Banknote, Bitcoin, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';


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
  const router = useRouter();
  const { toast } = useToast();
  const plan = searchParams.get('plan') || 'N/A';
  const price = searchParams.get('price') || 'N/A';
  const period = searchParams.get('period') || 'N/A';
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentClick = () => {
    if (selectedMethod) {
      setIsDialogOpen(true);
    }
  }
  
  const handleConfirmPayment = () => {
    setIsProcessing(true);
    // Simulate API call for payment processing
    setTimeout(() => {
        setIsProcessing(false);
        setIsDialogOpen(false);
        toast({
            title: "Payment Successful!",
            description: `Your payment for the ${plan} has been confirmed.`,
        });
        router.push('/dashboard');
    }, 2000);
  }

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
                  <div
                    key={method.name}
                    className={cn(
                      "relative rounded-lg border p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:shadow-md",
                      selectedMethod === method.name ? 'border-primary border-2 bg-primary/5' : 'border'
                    )}
                    onClick={() => setSelectedMethod(method.name)}
                  >
                    {selectedMethod === method.name && (
                        <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                            <CheckCircle className="h-5 w-5" />
                        </div>
                    )}
                    {method.icon}
                    <span className="font-semibold">{method.name}</span>
                    <span className="text-xs text-center text-muted-foreground">{method.description}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-24 shadow-sm border">
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
                <Button className="w-full" disabled={!selectedMethod} onClick={handlePaymentClick}>
                  {selectedMethod ? `Pay with ${selectedMethod}` : 'Select a Payment Method'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
       <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Payment</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to pay {price} for the {plan} using {selectedMethod}. Are you sure you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmPayment} disabled={isProcessing}>
              {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isProcessing ? "Processing..." : "Confirm Payment"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
