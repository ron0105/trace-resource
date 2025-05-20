
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Plus, Upload, Check, AlertTriangle } from "lucide-react";

const DeveloperDashboard = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  
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
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </DialogTrigger>
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
              <p className="text-center py-8 text-muted-foreground">
                Select a project to view detailed compliance information
              </p>
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
              <div className="text-center py-8">
                <Button>Browse Materials</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default DeveloperDashboard;
