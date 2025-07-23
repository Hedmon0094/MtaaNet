
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wifi } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
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
            <CardTitle className="font-headline text-3xl">Privacy Policy</CardTitle>
            <CardDescription>Last updated: {new Date().toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm md:prose-base max-w-none text-card-foreground space-y-4">
            <p>
              Your privacy is important to us. It is MtaaNet's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.
            </p>

            <h2 className="font-headline text-xl">1. Information We Collect</h2>
            <p>
              We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used. This may include your name, email address, phone number, and payment information.
            </p>

            <h2 className="font-headline text-xl">2. How We Use Your Information</h2>
            <p>
             We use the information we collect to operate, maintain, and provide the features and functionality of the Service, to process payments, to communicate with you, and to personalize your experience.
            </p>
             <h2 className="font-headline text-xl">3. Data Security</h2>
            <p>
                We take reasonable precautions to protect your information. We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
            </p>

            <h2 className="font-headline text-xl">4. Cookies</h2>
            <p>
                We use cookies to store information about visitors' preferences, to record user-specific information on which pages the user accesses or visits, and to personalize or customize our web page content based upon visitors' browser type or other information that the visitor sends via their browser.
            </p>

            <h2 className="font-headline text-xl">5. Your Rights</h2>
            <p>
                You have the right to access, update, or delete the information we have on you. You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
            </p>

            <h2 className="font-headline text-xl">6. Changes to this Policy</h2>
            <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
