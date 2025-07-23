import { Wifi, Smartphone, Link as LinkIcon } from 'lucide-react';
import Header from '@/components/common/Header';
import { PlanCard } from '@/components/landing/PlanCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const plans = [
  {
    title: 'Hourly Pass',
    price: 'KES 20',
    period: '2 hrs',
    description: 'Perfect for quick tasks and browsing.',
    features: ['High-speed internet', 'Single device access', '2-hour validity'],
  },
  {
    title: 'Daily Pass',
    price: 'KES 50',
    period: 'day',
    description: 'All-day access for work or entertainment.',
    features: ['High-speed internet', 'Up to 2 devices', '24-hour validity', 'Email support'],
  },
  {
    title: 'Weekly Pass',
    price: 'KES 300',
    period: 'week',
    description: 'A full week of uninterrupted connectivity.',
    features: ['High-speed internet', 'Up to 3 devices', '7-day validity', 'Priority support'],
  },
  {
    title: 'Monthly Pass',
    price: 'KES 1000',
    period: 'month',
    description: 'Best value for long-term users.',
    features: ['Unlimited high-speed internet', 'Up to 5 devices', '30-day validity', '24/7 priority support'],
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,hsl(var(--background)),transparent)]"></div>
          </div>
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Fast, Affordable Internet for Your Mtaa
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    MtaaNet provides reliable community Wi-Fi with flexible plans. Get connected in minutes with our easy payment options.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="#pricing">View Plans</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                alt="Hero"
                width={600}
                height={400}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                data-ai-hint="community people kenya"
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">How MtaaNet Works for You</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We've built a seamless experience from payment to connection, with features designed for our communities.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Wifi className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Easy Hotspot Access</h3>
                <p className="text-sm text-muted-foreground">
                  Select a plan, pay, and get online. We use MAC-based access, so no complicated passwords.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Flexible Payments</h3>
                <p className="text-sm text-muted-foreground">
                  Pay with MPesa, Crypto, Bank Transfer, or a simple payment link sent to your phone.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <LinkIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Pay-by-Link</h3>
                <p className="text-sm text-muted-foreground">
                  Can't pay right away? Generate a secure SasaPay-style link to complete your payment later.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Choose Your Plan</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Simple, transparent pricing. Pick the plan that fits your needs and get connected today.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-sm gap-8 pt-12 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4">
              {plans.map((plan) => (
                <PlanCard key={plan.title} {...plan} />
              ))}
            </div>
          </div>
        </section>

        <section id="support" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Need Help? We're Here for You.</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Got a question or an issue? Our support team is ready to assist.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button type="submit" size="lg" asChild>
                <Link href="/dashboard/support">Contact Support</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} MtaaNet. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/terms" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
