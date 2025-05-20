
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, AlertTriangle, Upload } from "lucide-react";

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
  
  // Filter submissions based on view mode
  const filteredSubmissions = viewMode === 'all' 
    ? recentSubmissions 
    : recentSubmissions.filter(sub => sub.status.toLowerCase() === viewMode.toLowerCase());

  return (
    <MainLayout pageTitle="Admin Dashboard">
      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="dashboard-stat">{complianceOverview.totalProjects}</div>
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
            <div className="dashboard-stat">{complianceOverview.completedVerifications}</div>
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
            <div className="dashboard-stat">{complianceOverview.pendingReviews}</div>
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
            <div className="dashboard-stat">{complianceOverview.flaggedIssues}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Submissions Charts */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Compliance Submissions</CardTitle>
          <CardDescription>Monthly WMUP and EPR submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={submissionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="wmup" name="WMUP Submissions" fill="#0E9F6E" />
                <Bar dataKey="epr" name="EPR Submissions" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

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
                        <Button variant="outline" size="sm">Download</Button>
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
    </MainLayout>
  );
};

export default AdminDashboard;
