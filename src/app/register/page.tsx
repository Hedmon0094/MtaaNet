import { RegisterForm } from '@/components/auth/RegisterForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wifi } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
             <Link href="/" className="flex items-center justify-center gap-2 mb-4">
                <Wifi className="h-8 w-8 text-primary" />
            </Link>
            <CardTitle className="font-headline text-2xl">Create Your <span className="text-primary">Account</span></CardTitle>
            <CardDescription>Join the MtaaNet community today!</CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
             <p className="mt-4 text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                    Log In
                </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
