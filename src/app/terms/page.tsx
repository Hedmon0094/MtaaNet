
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wifi } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl">
        <div className="mb-4">
            <Button variant="outline" asChild>
                <Link href="/">
                    <ArrowLeft className="mr-2" />
                    Back to Home
                </Link>
            </Button>
        </div>
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
                <Wifi className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-3xl">Terms of Service</CardTitle>
            <CardDescription>Last updated: {new Date().toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm md:prose-base max-w-none text-card-foreground space-y-4">
            <p>
              Welcome to MtaaNet! These terms and conditions outline the rules and regulations for the use of MtaaNet's Website, located at mtaanet.co.ke.
            </p>

            <h2 className="font-headline text-xl">1. Acceptance of Terms</h2>
            <p>
              By accessing this website, we assume you accept these terms and conditions. Do not continue to use MtaaNet if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <h2 className="font-headline text-xl">2. License</h2>
            <p>
              Unless otherwise stated, MtaaNet and/or its licensors own the intellectual property rights for all material on MtaaNet. All intellectual property rights are reserved. You may access this from MtaaNet for your own personal use subjected to restrictions set in these terms and conditions.
            </p>
             <h2 className="font-headline text-xl">3. User Responsibilities</h2>
            <p>
                You are responsible for ensuring that your account information is accurate and for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.
            </p>

            <h2 className="font-headline text-xl">4. Service Availability</h2>
            <p>
                Our service is provided on an "as is" and "as available" basis. We do not guarantee that the service will be uninterrupted, timely, secure, or error-free.
            </p>

            <h2 className="font-headline text-xl">5. Limitation of Liability</h2>
            <p>
              In no event shall MtaaNet, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website whether such liability is under contract. MtaaNet, including its officers, directors, and employees shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.
            </p>
             <h2 className="font-headline text-xl">6. Changes to Terms</h2>
            <p>
                We reserve the right to revise these terms and conditions at any time. By using this Website you are expected to review these terms on a regular basis.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
