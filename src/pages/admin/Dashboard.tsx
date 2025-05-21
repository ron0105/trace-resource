
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Check, AlertTriangle, Upload, UserPlus, Inbox, 
  Mail, FileText, Flag, Lightbulb, ChartBar,
  Save, BadgeCheck, Send, TrendingUp, Share, Smile
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

// Mock data for dashboard
const complianceOverview = {
  totalProjects: 28,
  completedVerifications: 18,
  pendingReviews: 7,
  flaggedIssues: 3
};

// Mock data for monthly submissions chart
const submissionsData = [
  { month: 'Jan', wmup: 12, epr: 8 },
  { month: 'Feb', wmup: 15, epr: 10 },
  { month: 'Mar', wmup: 18, epr: 14 },
  { month: 'Apr', wmup: 14, epr: 12 },
  { month: 'May', wmup: 20, epr: 15 },
  { month: 'Jun', wmup: 17, epr: 13 },
  { month: 'Jul', wmup: 22, epr: 18 },
  { month: 'Aug', wmup: 26, epr: 21 }
];

// Mock data for clients needing attention
const clientsNeedingAction = [
  { 
    id: 'CL001', 
    name: 'Dev Corp', 
    issue: 'Missing EPR quarterly data',
    dueDate: '2025-06-01',
    urgency: 'High',
    status: 'No Reviewer Assigned'
  },
  { 
    id: 'CL002', 
    name: 'EcoBuilders', 
    issue: 'Compliance deadline approaching',
    dueDate: '2025-05-30',
    urgency: 'Medium',
    status: 'Reviewer Assigned'
  },
  { 
    id: 'CL003', 
    name: 'New Sign-up: Lake Realty', 
    issue: 'Onboarding incomplete',
    dueDate: '2025-05-25',
    urgency: 'High',
    status: 'No Reviewer Assigned'
  }
];

// Mock data for recent submissions
const recentSubmissions = [
  { 
    id: 'SUB007', 
    project: 'Urban Heights Tower', 
    developer: 'Dev Corp', 
    type: 'WMUP', 
    submitted: '2024-05-12', 
    status: 'Pending' 
  },
  { 
    id: 'SUB008', 
    project: 'Green Valley Residences', 
    developer: 'EcoBuilders', 
    type: 'EPR', 
    submitted: '2024-05-11', 
    status: 'Pending' 
  },
  { 
    id: 'SUB009', 
    project: 'Lakeside Apartments', 
    developer: 'Lake Realty', 
    type: 'WMUP', 
    submitted: '2024-05-10', 
    status: 'Flagged' 
  },
  { 
    id: 'SUB010', 
    project: 'Highland Towers', 
    developer: 'Mountain Developers', 
    type: 'EPR', 
    submitted: '2024-05-09', 
    status: 'Approved' 
  }
];

const AdminDashboard = () => {
  const [viewMode, setViewMode] = useState('all');
  const [selectedTab, setSelectedTab] = useState('overview');
  const { toast } = useToast();
  
  // Status indicator component
  const StatusIndicator = ({ status }: { status: string }) => {
    if (status === 'Approved') {
      return <div className="flex items-center gap-1 text-green-600 text-xs font-medium px-2 py-1 bg-green-50 rounded-full">
        <Check className="h-3 w-3" /> Approved
      </div>;
    } else if (status === 'Pending') {
      return <div className="flex items-center gap-1 text-amber-600 text-xs font-medium px-2 py-1 bg-amber-50 rounded-full">
        <Upload className="h-3 w-3" /> Pending
      </div>;
    } else if (status === 'No Reviewer Assigned') {
      return <div className="flex items-center gap-1 text-red-600 text-xs font-medium px-2 py-1 bg-red-50 rounded-full">
        <AlertTriangle className="h-3 w-3" /> No Reviewer
      </div>;
    } else if (status === 'Reviewer Assigned') {
      return <div className="flex items-center gap-1 text-blue-600 text-xs font-medium px-2 py-1 bg-blue-50 rounded-full">
        <UserPlus className="h-3 w-3" /> Assigned
      </div>;
    } else {
      return <div className="flex items-center gap-1 text-red-600 text-xs font-medium px-2 py-1 bg-red-50 rounded-full">
        <AlertTriangle className="h-3 w-3" /> Flagged
      </div>;
    }
  };

  const handleAssignReviewer = (clientId: string) => {
    toast({
      title: "Reviewer Assigned",
      description: `Reviewer has been assigned to client ${clientId}`,
    });
  };

  const handleSendReminder = (clientId: string) => {
    toast({
      title: "Reminder Sent",
      description: `Reminder email sent to client ${clientId}`,
    });
  };
  
  const handleAutoFlagData = (submissionId: string) => {
    toast({
      title: "Data Flagged",
      description: `Submission ${submissionId} has been flagged for review`,
    });
  };

  const handleGenerateReport = (clientId: string) => {
    toast({
      title: "Report Generated",
      description: `ESG summary report has been generated for client ${clientId}`,
    });
  };
  
  const handleSaveReport = (reportId: string) => {
    toast({
      title: "Report Saved",
      description: `Report ${reportId} has been saved to the database`,
    });
  };

  const handleSendActionPlan = (clientId: string) => {
    toast({
      title: "Action Plan Sent",
      description: `Corrective action plan sent to client ${clientId}`,
    });
  };
  
  const handleShareReport = (reportId: string) => {
    toast({
      title: "Report Shared",
      description: `Report ${reportId} has been shared with founders and client`,
    });
  };

  // Filter submissions based on view mode
  const filteredSubmissions = viewMode === 'all' 
    ? recentSubmissions 
    : recentSubmissions.filter(sub => sub.status.toLowerCase() === viewMode.toLowerCase());

  return (
    <MainLayout pageTitle="Admin Dashboard">
      <Tabs defaultValue="overview" className="w-full" onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="clients">Client Management</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Workflow</TabsTrigger>
          <TabsTrigger value="reports">Reporting</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Overview */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{complianceOverview.totalProjects}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  14 active, 14 completed
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Completed Verifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{complianceOverview.completedVerifications}</div>
                <Progress 
                  value={complianceOverview.completedVerifications / complianceOverview.totalProjects * 100} 
                  className="mt-2" 
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{complianceOverview.pendingReviews}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Requires attention within 7 days
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Flagged Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{complianceOverview.flaggedIssues}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Requires immediate attention
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Submissions */}
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <CardTitle>Recent Submissions</CardTitle>
                <CardDescription>Review and manage compliance submissions</CardDescription>
              </div>
              <div className="inline-flex items-center rounded-lg border p-1">
                <Button
                  variant={viewMode === 'all' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('all')}
                >
                  All
                </Button>
                <Button
                  variant={viewMode === 'pending' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('pending')}
                >
                  Pending
                </Button>
                <Button
                  variant={viewMode === 'flagged' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('flagged')}
                >
                  Flagged
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {filteredSubmissions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No submissions matching the selected filter</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredSubmissions.map(submission => (
                    <div key={submission.id} className="p-4 border rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium">{submission.project}</h4>
                            <span className="mx-2 text-muted-foreground">•</span>
                            <p className="text-sm text-muted-foreground">{submission.developer}</p>
                          </div>
                          <div className="flex items-center mt-1">
                            <p className="text-sm">{submission.type} Submission</p>
                            <span className="mx-2 text-muted-foreground">•</span>
                            <p className="text-sm text-muted-foreground">ID: {submission.id}</p>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Submitted on {submission.submitted}
                          </p>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2">
                          <StatusIndicator status={submission.status} />
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Review</Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleAutoFlagData(submission.id)}
                            >
                              <Flag className="mr-2 h-4 w-4" />
                              Flag Issues
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-center mt-6">
                <Button variant="outline">View All Submissions</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Client Management Tab */}
        <TabsContent value="clients" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Clients Needing Attention</CardTitle>
              <CardDescription>Clients that need administrator action</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientsNeedingAction.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>{client.issue}</TableCell>
                      <TableCell>{client.dueDate}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          client.urgency === 'High' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {client.urgency}
                        </span>
                      </TableCell>
                      <TableCell>
                        <StatusIndicator status={client.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleAssignReviewer(client.id)}
                          >
                            <UserPlus className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleSendReminder(client.id)}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button className="w-full">View All Clients</Button>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>New Client Onboarding</CardTitle>
                <CardDescription>Recently registered clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Lake Realty</h3>
                        <p className="text-sm text-muted-foreground">Registered on 2024-05-15</p>
                      </div>
                      <Button 
                        onClick={() => handleAssignReviewer('CL003')} 
                        size="sm"
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Assign Reviewer
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Skyline Constructions</h3>
                        <p className="text-sm text-muted-foreground">Registered on 2024-05-14</p>
                      </div>
                      <Button size="sm" variant="outline" disabled>Assigned</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reminder Schedule</CardTitle>
                <CardDescription>Upcoming reminders and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">Quarterly Returns</h3>
                          <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">Due in 5 days</span>
                        </div>
                        <p className="text-sm text-muted-foreground">For Dev Corp, EcoBuilders, and 3 others</p>
                      </div>
                      <Button 
                        onClick={() => toast({ 
                          title: "Reminders Scheduled", 
                          description: "Batch reminders scheduled for all clients" 
                        })} 
                        size="sm"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Send Reminders
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">EPR Compliance Deadline</h3>
                          <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full">Due in 15 days</span>
                        </div>
                        <p className="text-sm text-muted-foreground">For Mountain Developers, Lake Realty</p>
                      </div>
                      <Button 
                        onClick={() => toast({ 
                          title: "Notification Sent", 
                          description: "EPR deadline notification sent to clients" 
                        })} 
                        size="sm" 
                        variant="outline"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Notify
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Compliance Workflow Tab */}
        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-base">Missing Entries</CardTitle>
                  <Inbox className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>Scan for missing compliance data</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Missing WMUP Data</div>
                    <div className="text-sm text-muted-foreground">5 projects</div>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Missing EPR Forms</div>
                    <div className="text-sm text-muted-foreground">3 projects</div>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Incomplete Certificates</div>
                    <div className="text-sm text-muted-foreground">8 projects</div>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => toast({ 
                    title: "Scan Complete", 
                    description: "16 missing entries identified" 
                  })} 
                  variant="outline" 
                  className="w-full"
                >
                  <Inbox className="mr-2 h-4 w-4" />
                  Scan For Missing Entries
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-base">Flagged Submissions</CardTitle>
                  <Flag className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>Submissions with issues</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {[
                    { id: 'SUB009', project: 'Lakeside Apartments', issue: 'Inconsistent waste data' },
                    { id: 'SUB011', project: 'Riverside Complex', issue: 'Missing material certificates' }
                  ].map(item => (
                    <div key={item.id} className="border rounded p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-sm">{item.project}</div>
                          <div className="text-xs text-muted-foreground mt-1">{item.issue}</div>
                        </div>
                        <Button 
                          onClick={() => handleSendActionPlan(item.id)} 
                          variant="outline" 
                          size="sm"
                        >
                          <Send className="mr-2 h-3 w-3" />
                          Action Plan
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => toast({ 
                    title: "Data Flagging Complete", 
                    description: "Auto-flagging process has completed" 
                  })} 
                  variant="outline" 
                  className="w-full"
                >
                  <Flag className="mr-2 h-4 w-4" />
                  Run Auto-Flag Process
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-base">Recommendations</CardTitle>
                  <Lightbulb className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>Compliance tips for clients</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {[
                    { 
                      client: 'Dev Corp', 
                      recommendation: 'Consider recycled aggregates for upcoming project phase' 
                    },
                    { 
                      client: 'EcoBuilders', 
                      recommendation: 'EPR compliance can be improved with additional certifications' 
                    }
                  ].map((item, i) => (
                    <div key={i} className="border rounded p-3">
                      <div>
                        <div className="font-medium text-sm">{item.client}</div>
                        <div className="text-xs text-muted-foreground mt-1">{item.recommendation}</div>
                      </div>
                      <div className="flex justify-end mt-2">
                        <Button 
                          onClick={() => toast({ 
                            title: "Recommendation Sent", 
                            description: `Recommendation sent to ${item.client}` 
                          })} 
                          variant="outline" 
                          size="sm"
                        >
                          Send
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => toast({ 
                    title: "Recommendations Generated", 
                    description: "New compliance tips generated for all clients" 
                  })} 
                  variant="outline" 
                  className="w-full"
                >
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Generate Recommendations
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Parameters</CardTitle>
              <CardDescription>Review and update compliance requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { 
                      name: 'WMUP Documentation', 
                      description: 'Complete waste management plan', 
                      required: true,
                      status: 'Active'
                    },
                    { 
                      name: 'EPR Registration', 
                      description: 'Extended producer responsibility registration', 
                      required: true,
                      status: 'Active'
                    },
                    { 
                      name: 'Material Certificates', 
                      description: 'Certificates for recycled materials', 
                      required: true,
                      status: 'Active'
                    },
                    { 
                      name: 'Quarterly Waste Reports', 
                      description: 'Reports on waste generation and disposal', 
                      required: true,
                      status: 'Active'
                    }
                  ].map((param, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{param.name}</TableCell>
                      <TableCell>{param.description}</TableCell>
                      <TableCell>{param.required ? 'Yes' : 'No'}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {param.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                onClick={() => toast({ 
                  title: "Parameters Updated", 
                  description: "Compliance parameters have been updated" 
                })} 
                variant="outline"
              >
                Update Parameters
              </Button>
              <Button 
                onClick={() => toast({ 
                  title: "ESG Score Updated", 
                  description: "ESG scores have been recalculated" 
                })}
              >
                <BadgeCheck className="mr-2 h-4 w-4" />
                Finalize Compliance Tags
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Reporting Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ESG Summary Dashboard</CardTitle>
                <CardDescription>Environmental, Social, and Governance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">78%</div>
                      <div className="text-sm text-muted-foreground">Environment</div>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">64%</div>
                      <div className="text-sm text-muted-foreground">Social</div>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">91%</div>
                      <div className="text-sm text-muted-foreground">Governance</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="text-sm font-medium">Recycled Material Usage</div>
                        <div className="text-sm">82%</div>
                      </div>
                      <Progress value={82} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="text-sm font-medium">Waste Reduction</div>
                        <div className="text-sm">68%</div>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="text-sm font-medium">Carbon Footprint</div>
                        <div className="text-sm">76%</div>
                      </div>
                      <Progress value={76} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  onClick={() => handleGenerateReport('ESG-001')} 
                  variant="outline"
                >
                  <ChartBar className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
                <Button 
                  onClick={() => handleSaveReport('ESG-001')}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Report
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Summary</CardTitle>
                <CardDescription>Overall compliance status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="text-5xl font-bold mb-2">76%</div>
                  <div className="text-sm text-muted-foreground">Overall Compliance Rate</div>
                  
                  <div className="w-full mt-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <div className="text-sm">Fully Compliant</div>
                        </div>
                        <div className="text-sm font-medium">12 projects</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                          <div className="text-sm">Partially Compliant</div>
                        </div>
                        <div className="text-sm font-medium">9 projects</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                          <div className="text-sm">Non-Compliant</div>
                        </div>
                        <div className="text-sm font-medium">7 projects</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  onClick={() => toast({ 
                    title: "Compliance Updated", 
                    description: "Compliance percentages have been updated" 
                  })} 
                  variant="outline"
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Update Compliance %
                </Button>
                <Button 
                  onClick={() => handleShareReport('COM-002')}
                >
                  <Share className="mr-2 h-4 w-4" />
                  Share Report
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Client Satisfaction</CardTitle>
              <CardDescription>ESG transparency and client feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
                  <div className="text-sm text-center">Client Satisfaction Rate</div>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                  <div className="text-3xl font-bold text-amber-600 mb-2">78%</div>
                  <div className="text-sm text-center">ESG Transparency Score</div>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">85%</div>
                  <div className="text-sm text-center">Recommendation Rate</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Latest Feedback</h4>
                <div className="space-y-4">
                  <div className="p-3 bg-muted/50 rounded-md">
                    <div className="flex items-center mb-1">
                      <Smile className="h-4 w-4 text-green-600 mr-2" />
                      <span className="font-medium">Dev Corp</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "The ESG reporting has significantly improved our transparency with stakeholders."
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-md">
                    <div className="flex items-center mb-1">
                      <Smile className="h-4 w-4 text-green-600 mr-2" />
                      <span className="font-medium">EcoBuilders</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "The compliance tracking has simplified our regulatory reporting process."
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Generate Comprehensive ESG Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default AdminDashboard;
