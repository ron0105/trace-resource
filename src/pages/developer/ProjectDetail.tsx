
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Check, AlertTriangle, Upload, Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock project data based on ID
const projectsData = {
  'PRJ001': { 
    id: 'PRJ001', 
    name: 'Urban Heights Tower', 
    location: 'Mumbai',
    description: 'A 32-story premium residential tower with 128 luxury apartments',
    reraId: 'RERA-MH-12345',
    area: '25,000 sq.m', 
    status: 'Approved',
    wmupStatus: 'Approved',
    eprStatus: 'Approved',
    submissions: [
      { id: 'SUB001', type: 'WMUP', date: '2023-11-15', status: 'Approved', notes: 'Approved by CPCB on Dec 10, 2023' },
      { id: 'SUB002', type: 'EPR', date: '2023-11-20', status: 'Approved', notes: 'Approved by SPCB on Dec 15, 2023' }
    ],
    compliance: {
      wmup: 100,
      epr: 100,
      overall: 100
    }
  },
  'PRJ002': { 
    id: 'PRJ002', 
    name: 'Green Valley Residences', 
    location: 'Bangalore',
    description: 'Sustainable housing complex with 85 eco-friendly villas',
    reraId: 'RERA-KA-67890',
    area: '18,500 sq.m', 
    status: 'Pending',
    wmupStatus: 'Pending',
    eprStatus: 'Approved',
    submissions: [
      { id: 'SUB003', type: 'WMUP', date: '2024-02-10', status: 'Pending', notes: 'Under review by CPCB since Feb 15, 2024' },
      { id: 'SUB004', type: 'EPR', date: '2024-01-25', status: 'Approved', notes: 'Approved by SPCB on Feb 5, 2024' }
    ],
    compliance: {
      wmup: 65,
      epr: 100,
      overall: 80
    }
  },
  'PRJ003': { 
    id: 'PRJ003', 
    name: 'Eco Apartments Phase 2', 
    location: 'Delhi',
    description: 'Second phase of mid-range apartment complex with 64 units',
    reraId: 'RERA-DL-54321',
    area: '12,800 sq.m', 
    status: 'Flagged',
    wmupStatus: 'Flagged',
    eprStatus: 'Pending',
    submissions: [
      { id: 'SUB005', type: 'WMUP', date: '2024-02-28', status: 'Flagged', notes: 'Returned with comments on waste segregation plan' },
      { id: 'SUB006', type: 'EPR', date: '2024-03-01', status: 'Pending', notes: 'Under initial review' }
    ],
    compliance: {
      wmup: 40,
      epr: 60,
      overall: 50
    }
  }
};

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [uploadType, setUploadType] = useState<'WMUP' | 'EPR'>('WMUP');
  const { toast } = useToast();
  
  // Get project data based on ID
  const project = projectId && projectsData[projectId as keyof typeof projectsData];
  
  if (!project) {
    return (
      <MainLayout pageTitle="Project Not Found">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Project not found</h2>
          <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or you don't have access to it.</p>
          <Button asChild>
            <a href="/developer/projects">Return to Projects</a>
          </Button>
        </div>
      </MainLayout>
    );
  }

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileSelected(true);
    } else {
      setFileSelected(false);
    }
  };

  const handleUploadSubmit = () => {
    if (!fileSelected) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "File Uploaded",
      description: `Your ${uploadType} has been submitted for review.`,
    });
    
    setUploadDialogOpen(false);
    setFileSelected(false);
  };

  return (
    <MainLayout pageTitle={project.name}>
      {/* Project Overview */}
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">RERA ID</p>
                <p className="font-medium">{project.reraId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{project.location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Built-up Area</p>
                <p className="font-medium">{project.area}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall Status</p>
                <StatusIndicator status={project.status} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Compliance Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">WMUP</span>
                  <span className="text-sm font-medium">{project.compliance.wmup}%</span>
                </div>
                <Progress value={project.compliance.wmup} />
                <div className="mt-1">
                  <StatusIndicator status={project.wmupStatus} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">EPR</span>
                  <span className="text-sm font-medium">{project.compliance.epr}%</span>
                </div>
                <Progress value={project.compliance.epr} />
                <div className="mt-1">
                  <StatusIndicator status={project.eprStatus} />
                </div>
              </div>
              
              <Separator className="my-3" />
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Overall</span>
                  <span className="text-sm font-medium">{project.compliance.overall}%</span>
                </div>
                <Progress value={project.compliance.overall} className="h-2" />
              </div>
              
              <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full mt-4">Upload Documents</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Compliance Document</DialogTitle>
                    <DialogDescription>
                      Upload your WMUP or EPR document for regulatory approval.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Document Type
                      </label>
                      <select 
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                        value={uploadType}
                        onChange={(e) => setUploadType(e.target.value as 'WMUP' | 'EPR')}
                      >
                        <option value="WMUP">Waste Management & Utilization Plan (WMUP)</option>
                        <option value="EPR">Extended Producer Responsibility (EPR)</option>
                      </select>
                    </div>
                    
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm mb-2">
                        {fileSelected ? "File selected" : "Drag and drop or click to upload"}
                      </p>
                      <input 
                        type="file" 
                        className="hidden" 
                        id="fileUpload" 
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="fileUpload">
                        <Button variant="outline" size="sm" className="mt-2" asChild>
                          <span>Browse Files</span>
                        </Button>
                      </label>
                      <p className="text-xs text-muted-foreground mt-4">
                        Supports PDF, DOC, DOCX, XLS, XLSX (Max 10MB)
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleUploadSubmit}>
                      Upload & Submit
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Details Tabs */}
      <Tabs defaultValue="submissions" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="submissions">
          <Card>
            <CardHeader>
              <CardTitle>Document Submissions</CardTitle>
              <CardDescription>
                Track the status of your regulatory document submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {project.submissions.map(submission => (
                  <div key={submission.id} className="p-4 border rounded-lg">
                    <div className="flex flex-col sm:flex-row justify-between gap-3">
                      <div>
                        <h4 className="font-medium">{submission.type}</h4>
                        <p className="text-sm text-muted-foreground">
                          Submitted on {submission.date} • ID: {submission.id}
                        </p>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        <StatusIndicator status={submission.status} />
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                    {submission.notes && (
                      <div className="mt-3 text-sm p-2 bg-muted rounded">
                        <p>{submission.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
              <CardDescription>
                View the chronological history of your project compliance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Timeline Content */}
                <ol className="relative border-l border-gray-200">
                  {project.submissions.map((submission, index) => (
                    <li key={index} className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 bg-muted">
                        <FileText className="h-3 w-3" />
                      </span>
                      <h3 className="flex items-center mb-1 text-lg font-semibold">
                        {submission.type} {submission.status === 'Approved' && (
                          <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3">
                            Approved
                          </span>
                        )}
                      </h3>
                      <time className="block mb-2 text-sm font-normal leading-none text-muted-foreground">
                        {submission.date}
                      </time>
                      <p className="mb-4 text-base font-normal">
                        {submission.notes}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Reports</CardTitle>
              <CardDescription>
                Download official compliance reports for your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">CPCB Compliance Report</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Official compliance report for Central Pollution Control Board
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">SPCB Compliance Report</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Official compliance report for State Pollution Control Board
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">ESG Performance Report</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Environmental, Social, and Governance metrics report
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download Excel
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

export default ProjectDetail;
