
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Moon, Sun, Monitor } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2 grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Profile Settings</CardTitle>
            <CardDescription>
              Update your personal information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue="John Doe" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="0712345678" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" defaultValue="john.doe@example.com" readOnly disabled />
            </div>
            <Button>Update Profile</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Change Password</CardTitle>
            <CardDescription>
              For your security, we recommend using a strong password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            <Button>Change Password</Button>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-1">
        <Card>
           <CardHeader>
            <CardTitle className="font-headline text-2xl">Theme</CardTitle>
            <CardDescription>
              Choose how you want to experience your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="system" className="space-y-2">
              <Label className="flex items-center gap-4 rounded-lg p-2 hover:bg-accent cursor-pointer transition-colors">
                <RadioGroupItem value="light" id="light" />
                <Sun className="h-5 w-5" />
                <span>Light</span>
              </Label>
              <Label className="flex items-center gap-4 rounded-lg p-2 hover:bg-accent cursor-pointer transition-colors">
                <RadioGroupItem value="dark" id="dark" />
                <Moon className="h-5 w-5" />
                <span>Dark</span>
              </Label>
              <Label className="flex items-center gap-4 rounded-lg p-2 hover:bg-accent cursor-pointer transition-colors">
                <RadioGroupItem value="system" id="system" />
                <Monitor className="h-5 w-5" />
                <span>System</span>
              </Label>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
