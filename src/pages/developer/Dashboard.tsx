
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Plus, Upload, Check, AlertTriangle, ClipboardCheck, ShoppingBag, BarChart3, ArrowRight } from "lucide-react";

const DeveloperDashboard = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showAddProjectDialog, setShowAddProjectDialog] = useState(false);
  
  // Mock project data
  const recentProjects = [
    { id: 'PRJ001', name: 'Urban Heights Tower', location: 'Mumbai', status: 'Approved', progress: 100 },
    { id: 'PRJ002', name: 'Green Valley Residences', location: 'Bangalore', status: 'Pending', progress: 65 },
    { id: 'PRJ003', name: 'Eco Apartments Phase 2', location: 'Delhi', status: 'Flagged', progress: 40 }
  ];

  // Status indicator component
  const StatusIndicator = ({ status }: { status: string }) => {
    if (status === 'Approved') {
      return <div className="status-badge status-badge-approved">
        <Check className="mr-1 h-3 w-3" /> Approved
      </div>;
    } else if (status === 'Pending') {
      return <div className="status-badge status-badge-pending">
        <Upload className="mr-1 h-3 w-3" /> Pending
      </div>;
    } else {
      return <div className="status-badge status-badge-flagged">
        <AlertTriangle className="mr-1 h-3 w-3" /> Flagged
      </div>;
    }
  };

  // Module cards for the dashboard
  const moduleCards = [
    {
      title: "Compliance Engine",
      description: "Manage project compliance, generate WMUP/WUP, submit EPR forms",
      icon: <ClipboardCheck className="h-10 w-10 text-primary" />,
      link: "/developer/projects"
    },
    {
      title: "Marketplace",
      description: "Source sustainable materials linked to your utilization plans",
      icon: <ShoppingBag className="h-10 w-10 text-primary" />,
      link: "/developer/marketplace/home"
    },
    {
      title: "Reporting & Insights",
      description: "Track ESG performance and generate regulatory reports",
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      link: "/developer/reports"
    }
  ];

  return (
    <MainLayout pageTitle="Developer Dashboard">
      {/* Welcome Dialog */}
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Welcome to Trace Platform</DialogTitle>
            <DialogDescription>
              Your sustainability compliance management platform. Get started by adding your first project.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center justify-center">
              <div className="bg-green-100 p-3 rounded-full">
                <FileText className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mt-4 font-medium">Start Managing Compliance</h3>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Submit and track Extended Producer Responsibility (EPR) 
                and Waste Management & Utilization Plans (WMUP)
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowWelcome(false)}>Get Started</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dashboard Summary */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="dashboard-stat">3</div>
            <p className="text-xs text-muted-foreground mt-2">
              2 active, 1 completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="dashboard-stat">87%</div>
            <Progress value={87} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="dashboard-stat">1</div>
            <p className="text-xs text-muted-foreground mt-2">
              WMUP review in progress
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Materials Sourced</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="dashboard-stat">68%</div>
            <p className="text-xs text-muted-foreground mt-2">
              From certified vendors
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Module Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {moduleCards.map((module, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-3">
                {module.icon}
              </div>
              <CardTitle>{module.title}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to={module.link}>
                  Access Module <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="dash-section-title">Recent Projects</h2>
            
            <Dialog open={showAddProjectDialog} onOpenChange={setShowAddProjectDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Project
                </Button>
              </DialogTrigger>
              
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Project</DialogTitle>
                  <DialogDescription>
                    Enter project details to create a new sustainability compliance project.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  {/* Form content would go here */}
                  <p className="text-center py-4 text-muted-foreground">
                    Project form fields will appear here
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddProjectDialog(false)}>Cancel</Button>
                  <Button onClick={() => setShowAddProjectDialog(false)}>Create Project</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid gap-4">
            {recentProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="font-medium">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.location} • ID: {project.id}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <StatusIndicator status={project.status} />
                      <div className="w-32">
                        <Progress value={project.progress} />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 py-3">
                  <div className="flex justify-end w-full gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/developer/compliance/wmup-generator/${project.id}`}>
                        WMUP Generator
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/developer/compliance/epr-form/${project.id}`}>
                        EPR Form
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link to={`/developer/projects/${project.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Summary</CardTitle>
              <CardDescription>
                View and manage your compliance documents and status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Required Actions</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <div className="bg-yellow-100 text-yellow-800 p-1 rounded-full mr-2">
                        <AlertTriangle className="h-3 w-3" />
                      </div>
                      Complete EPR form for Green Valley Residences
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="bg-yellow-100 text-yellow-800 p-1 rounded-full mr-2">
                        <AlertTriangle className="h-3 w-3" />
                      </div>
                      Upload quarterly waste data for Eco Apartments Phase 2
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Compliance Tools</h3>
                  <div className="grid gap-2">
                    <Button variant="outline" asChild className="justify-start">
                      <Link to="/developer/compliance/tracker">
                        <ClipboardCheck className="mr-2 h-4 w-4" />
                        Compliance Tracker
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="justify-start">
                      <Link to="/developer/compliance/quarterly-returns/all">
                        <FileText className="mr-2 h-4 w-4" />
                        Quarterly Returns
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="marketplace">
          <Card>
            <CardHeader>
              <CardTitle>Marketplace</CardTitle>
              <CardDescription>
                Source sustainable construction materials from verified vendors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">BOQ Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      View materials recommended based on your WMUP data
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link to="/developer/marketplace/boq/all">
                        View Suggestions
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Vendor Directory</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Browse certified sustainable material suppliers
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link to="/developer/marketplace/vendors">
                        Browse Vendors
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Order Tracking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Track and manage your existing material orders
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link to="/developer/marketplace/orders/track">
                        Track Orders
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default DeveloperDashboard;
