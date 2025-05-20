
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [userRole, setUserRole] = useState('developer');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (!phoneNumber) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }
    
    // Mock OTP sending
    setOtpSent(true);
    toast({
      title: "OTP Sent",
      description: "A verification code has been sent to your phone.",
    });
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && !otpSent) {
      toast({
        title: "Error",
        description: "Please verify your phone number first.",
        variant: "destructive",
      });
      return;
    }

    if (!isLogin && (!email || !password)) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Mock authentication
    toast({
      title: isLogin ? "Logged In" : "Registration Successful",
      description: isLogin ? "Welcome back!" : "Your account has been created.",
    });

    // Redirect based on role
    setTimeout(() => {
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('isAuthenticated', 'true');
      
      if (userRole === 'developer') {
        navigate('/developer/dashboard');
      } else if (userRole === 'recycler') {
        navigate('/recycler/dashboard');
      } else {
        navigate('/admin/dashboard');
      }
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {isLogin ? "Login" : "Create Account"}
        </CardTitle>
        <CardDescription className="text-center">
          {isLogin ? "Access your Trace Platform account" : "Join the Trace Platform for sustainability compliance"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="phoneOtp" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="phoneOtp">Phone OTP</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
          </TabsList>
          <TabsContent value="phoneOtp">
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="flex space-x-2">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" onClick={handleSendOtp} disabled={otpSent}>
                    {otpSent ? "Resend" : "Send OTP"}
                  </Button>
                </div>
              </div>
              
              {otpSent && (
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                    Verification Code
                  </label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              )}
              
              {!isLogin && (
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}
              
              {!isLogin && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              )}
              
              {!isLogin && (
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    I am a:
                  </label>
                  <select 
                    id="role" 
                    value={userRole} 
                    onChange={(e) => setUserRole(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                  >
                    <option value="developer">Real Estate Developer</option>
                    <option value="recycler">Recycler/Vendor</option>
                    <option value="admin">Administrator/Certifier</option>
                  </select>
                </div>
              )}
              
              <Button type="submit" className="w-full">
                {isLogin ? "Login" : "Create Account"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="email">
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              {!isLogin && (
                <div>
                  <label htmlFor="role-email" className="block text-sm font-medium text-gray-700 mb-1">
                    I am a:
                  </label>
                  <select 
                    id="role-email" 
                    value={userRole} 
                    onChange={(e) => setUserRole(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                  >
                    <option value="developer">Real Estate Developer</option>
                    <option value="recycler">Recycler/Vendor</option>
                    <option value="admin">Administrator/Certifier</option>
                  </select>
                </div>
              )}
              
              <Button type="submit" className="w-full">
                {isLogin ? "Login" : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="text-sm">
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
