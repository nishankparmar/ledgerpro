
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, Home, Key, ArrowLeft } from 'lucide-react';

const Profile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    } else if (user) {
      // Initialize with user data
      setProfileData(prevData => ({
        ...prevData,
        fullName: user.email?.split('@')[0] || '',
        email: user.email || '',
      }));
    }
  }, [user, loading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleProfileUpdate = () => {
    // This would typically connect to your backend
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully."
    });
  };

  const handlePasswordChange = () => {
    if (profileData.newPassword !== profileData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Your new password and confirmation password must match."
      });
      return;
    }
    
    // This would typically connect to your backend
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully."
    });
    
    // Clear password fields
    setProfileData(prevData => ({
      ...prevData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-ledger-500 border-b-ledger-300 border-l-ledger-300 border-r-ledger-300 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-ledger-700 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-4xl">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-4"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold text-ledger-800">My Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Profile Information */}
        <Card className="md:col-span-7 shadow-sm">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="fullName"
                  name="fullName"
                  className="pl-10"
                  value={profileData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="pl-10"
                  value={profileData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  disabled
                />
              </div>
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Phone className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="phone"
                  name="phone"
                  className="pl-10"
                  value={profileData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address (Optional)</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Home className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="address"
                  name="address"
                  className="pl-10"
                  value={profileData.address}
                  onChange={handleChange}
                  placeholder="Your address"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleProfileUpdate}>Save Changes</Button>
          </CardFooter>
        </Card>
        
        {/* Change Password */}
        <Card className="md:col-span-5 shadow-sm">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Key className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  className="pl-10"
                  value={profileData.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter current password"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Key className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  className="pl-10"
                  value={profileData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Key className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="pl-10"
                  value={profileData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handlePasswordChange}>Update Password</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
