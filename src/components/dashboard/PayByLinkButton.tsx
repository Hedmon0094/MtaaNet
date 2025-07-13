"use client"

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Copy } from "lucide-react";
import { useState } from "react";

export function PayByLinkButton() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const generateAndCopyLink = () => {
    const paymentLink = "https://sasapay.co/pay/mtaanet/12345";
    navigator.clipboard.writeText(paymentLink);
    
    toast({
      title: "Link Copied!",
      description: "Payment link has been copied to your clipboard.",
    });

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button onClick={generateAndCopyLink} className="w-full">
        {copied ? <CheckCircle className="mr-2" /> : <Copy className="mr-2" />}
        {copied ? "Copied!" : "Generate Link"}
    </Button>
  );
}
