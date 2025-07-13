import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UsageChart } from "@/components/dashboard/UsageChart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { PayByLinkButton } from "@/components/dashboard/PayByLinkButton";

const payments = [
  { id: 'INV001', date: '2024-07-15', plan: 'Weekly Pass', amount: 'KES 300', status: 'Paid' },
  { id: 'INV002', date: '2024-07-08', plan: 'Weekly Pass', amount: 'KES 300', status: 'Paid' },
  { id: 'INV003', date: '2024-07-01', plan: 'Daily Pass', amount: 'KES 50', status: 'Paid' },
];

export default function DashboardPage() {
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your active internet package.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Weekly Pass</div>
            <p className="text-xs text-muted-foreground">Expires on 2024-07-22</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Data Usage</CardTitle>
            <CardDescription>This week's usage.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12.4 GB</div>
            <p className="text-xs text-muted-foreground">out of 25 GB</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pay-by-Link</CardTitle>
            <CardDescription>Generate a payment link.</CardDescription>
          </CardHeader>
          <CardContent>
             <PayByLinkButton />
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="pb-2">
            <CardTitle>My Invoices</CardTitle>
            <CardDescription>View and download invoices.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button variant="outline" className="w-full">View Invoices</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Traffic Monitor</CardTitle>
            <CardDescription>Your data usage over the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <UsageChart />
          </CardContent>
        </Card>
        
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>A list of your recent payments and invoices.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{payment.plan}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell><Badge variant="outline" className="text-primary border-primary">{payment.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
