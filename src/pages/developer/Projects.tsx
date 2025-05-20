
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Check, AlertTriangle, Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock project data
const initialProjects = [
  { 
    id: 'PRJ001', 
    name: 'Urban Heights Tower', 
    location: 'Mumbai', 
    reraId: 'RERA-MH-12345',
    area: '25,000 sq.m', 
    status: 'Approved', 
    lastUpdated: '2023-12-10' 
  },
  { 
    id: 'PRJ002', 
    name: 'Green Valley Residences', 
    location: 'Bangalore', 
    reraId: 'RERA-KA-67890',
    area: '18,500 sq.m', 
    status: 'Pending', 
    lastUpdated: '2024-02-18' 
  },
  { 
    id: 'PRJ003', 
    name: 'Eco Apartments Phase 2', 
    location: 'Delhi', 
    reraId: 'RERA-DL-54321',
    area: '12,800 sq.m', 
    status: 'Flagged', 
    lastUpdated: '2024-03-05' 
  }
];

const DeveloperProjects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    location: '',
    reraId: '',
    area: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  // Filter projects based on search term
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.reraId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle creating a new project
  const handleCreateProject = () => {
    if (!newProject.name || !newProject.location || !newProject.reraId || !newProject.area) {
      toast({
        title: "Missing Fields",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newProjectObj = {
      id: `PRJ${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: newProject.name,
      location: newProject.location,
      reraId: newProject.reraId,
      area: newProject.area,
      status: 'Pending',
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setProjects([...projects, newProjectObj]);
    setIsDialogOpen(false);
    setNewProject({ name: '', location: '', reraId: '', area: '' });

    toast({
      title: "Project Created",
      description: "Your project has been created successfully.",
    });
  };

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
    <MainLayout pageTitle="Projects">
      {/* Search and Add Project */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Enter the details for your new construction project.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium mb-1 block">
                  Project Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter project name"
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="location" className="text-sm font-medium mb-1 block">
                  Location
                </label>
                <Input
                  id="location"
                  placeholder="City"
                  value={newProject.location}
                  onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="reraId" className="text-sm font-medium mb-1 block">
                  RERA ID
                </label>
                <Input
                  id="reraId"
                  placeholder="RERA registration number"
                  value={newProject.reraId}
                  onChange={(e) => setNewProject({...newProject, reraId: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="area" className="text-sm font-medium mb-1 block">
                  Built-up Area
                </label>
                <Input
                  id="area"
                  placeholder="In sq.m"
                  value={newProject.area}
                  onChange={(e) => setNewProject({...newProject, area: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProject}>
                Create Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects List */}
      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredProjects.length === 0 ? (
            <div className="text-center py-6">
              <div className="mx-auto bg-muted w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium">No projects found</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                {searchTerm ? "Try a different search term" : "Create your first project to get started"}
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Project
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>RERA ID</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.location}</TableCell>
                    <TableCell>{project.reraId}</TableCell>
                    <TableCell>{project.area}</TableCell>
                    <TableCell>
                      <StatusIndicator status={project.status} />
                    </TableCell>
                    <TableCell>{project.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/developer/projects/${project.id}`)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default DeveloperProjects;
