import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LifeBuoy, Mail } from "lucide-react";

const faqs = [
  {
    question: "How do I connect to MtaaNet Wi-Fi?",
    answer: "Once you purchase a plan, your device's MAC address is automatically registered. Simply find the 'MtaaNet' Wi-Fi network and connect. No password is required."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept payments via MPesa, Crypto, Bank Transfer, and our secure Pay-by-Link option. You can choose your preferred method at checkout."
  },
  {
    question: "Can I use one plan on multiple devices?",
    answer: "This depends on the plan you choose. Our Daily, Weekly, and Monthly passes support multiple devices. The number of allowed devices is specified in the plan details."
  },
  {
    question: "What happens when my data runs out?",
    answer: "You will be redirected to our portal where you can purchase a new plan or a top-up bundle to continue using the internet."
  },
  {
    question: "How do I check my data balance?",
    answer: "You can check your data balance, plan validity, and usage history right here on your dashboard."
  }
];

export default function SupportPage() {
  return (
    <div className="container mx-auto py-4 grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Frequently Asked Questions</CardTitle>
            <CardDescription>
              Find answers to common questions about our service.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Contact Support</CardTitle>
            <CardDescription>
              Can't find an answer? Our team is here to help.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" asChild>
              <Link href="mailto:support@mtaanet.co.ke">
                <Mail className="mr-2" /> Email Support
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
                <Link href="#">
                    <LifeBuoy className="mr-2" /> Live Chat
                </Link>
            </Button>
            <p className="text-xs text-center text-muted-foreground">Live chat available Mon-Fri, 9am-5pm</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
