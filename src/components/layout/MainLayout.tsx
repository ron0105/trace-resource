
import { ReactNode, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell, Search, LogOut, Settings, User, FileText, Building, ShoppingBag } from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
  pageTitle: string;
}

const MainLayout = ({ children, pageTitle }: MainLayoutProps) => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Get user data from local storage for demo purposes
    const role = localStorage.getItem('userRole') || '';
    setUserRole(role);
    
    // Set mock user name based on role
    if (role === 'developer') {
      setUserName('Dev Corp');
    } else if (role === 'recycler') {
      setUserName('Eco Recyclers');
    } else if (role === 'admin') {
      setUserName('Admin User');
    }
    
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    navigate('/auth');
  };
  
  const getDashboardLink = () => {
    if (userRole === 'developer') return '/developer/dashboard';
    if (userRole === 'recycler') return '/recycler/dashboard';
    return '/admin/dashboard';
  };

  const isActive = (path: string) => {
    return location.pathname.includes(path) ? 'bg-muted' : '';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 h-8 w-8 rounded-md"></div>
              <span className="font-semibold text-xl">Trace</span>
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" alt={userName} />
                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{userName}</DropdownMenuLabel>
                <DropdownMenuLabel className="text-xs text-muted-foreground capitalize">
                  {userRole}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 px-4">
        {/* Sidebar */}
        <aside className="fixed top-16 z-20 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block border-r">
          <div className="h-full py-6 pr-6 lg:py-8">
            <nav className="grid items-start gap-2">
              <Button
                variant="ghost"
                className={`justify-start ${isActive('dashboard')}`}
                onClick={() => navigate(getDashboardLink())}
              >
                <Building className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              
              {userRole === 'developer' && (
                <>
                  <Button
                    variant="ghost"
                    className={`justify-start ${isActive('projects')}`}
                    onClick={() => navigate('/developer/projects')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Projects
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className={`justify-start ${isActive('marketplace')}`}
                    onClick={() => navigate('/developer/marketplace')}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Marketplace
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className={`justify-start ${isActive('reports')}`}
                    onClick={() => navigate('/developer/reports')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Reports
                  </Button>
                </>
              )}
              
              {userRole === 'recycler' && (
                <>
                  <Button
                    variant="ghost"
                    className={`justify-start ${isActive('listings')}`}
                    onClick={() => navigate('/recycler/listings')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    My Listings
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className={`justify-start ${isActive('orders')}`}
                    onClick={() => navigate('/recycler/orders')}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Orders
                  </Button>
                </>
              )}
              
              {userRole === 'admin' && (
                <>
                  <Button
                    variant="ghost"
                    className={`justify-start ${isActive('compliance')}`}
                    onClick={() => navigate('/admin/compliance')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Compliance
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className={`justify-start ${isActive('reports')}`}
                    onClick={() => navigate('/admin/reports')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Reports
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className={`justify-start ${isActive('users')}`}
                    onClick={() => navigate('/admin/users')}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Users
                  </Button>
                </>
              )}
            </nav>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex w-full flex-col overflow-hidden">
          <div className="py-6 lg:py-8 w-full">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mb-6">
              <div className="grid gap-1">
                <h1 className="font-semibold text-2xl md:text-3xl">{pageTitle}</h1>
              </div>
            </div>
            <Separator className="mb-6" />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
