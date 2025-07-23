import { LoginForm } from '@/components/auth/LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wifi } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <Link href="/" className="flex items-center justify-center gap-2 mb-4">
                <Wifi className="h-8 w-8 text-primary" />
            </Link>
            <CardTitle className="font-headline text-2xl">Welcome <span className="text-primary">Back!</span></CardTitle>
            <CardDescription>Log in to your MtaaNet account to continue.</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <p className="mt-4 text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/register" className="font-semibold text-primary hover:underline">
                    Register
                </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
