
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertCircle, BarChart, Download, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';

const ComplianceTracker = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<string>("all");
  
  // Mock compliance items
  const complianceItems = [
    { id: 1, name: "WMUP Submission", status: "approved", project: "Greenfield Residences", date: "2025-03-15", rera: "RERA-MH-12345" },
    { id: 2, name: "EPR Registration", status: "pending", project: "Urban Heights", date: "2025-04-02", rera: "RERA-KA-67890" },
    { id: 3, name: "Quarterly Returns Q1", status: "rejected", project: "Sunrise Complex", date: "2025-04-10", rera: "RERA-DL-54321" },
    { id: 4, name: "Certificate Upload", status: "approved", project: "Metro Park", date: "2025-03-28", rera: "RERA-TN-98765" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "rejected":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const filteredItems = selectedProject === "all" 
    ? complianceItems 
    : complianceItems.filter(item => item.project === selectedProject);

  return (
    <MainLayout pageTitle="Compliance Tracker">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Compliance Tracker</h1>
            <p className="text-muted-foreground">Track the status of all compliance documents and submissions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button onClick={() => navigate('/developer/projects')}>View All Projects</Button>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="ghg">GHG Credits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">EPR Compliance Status</h2>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="Greenfield Residences">Greenfield Residences</SelectItem>
                  <SelectItem value="Urban Heights">Urban Heights</SelectItem>
                  <SelectItem value="Sunrise Complex">Sunrise Complex</SelectItem>
                  <SelectItem value="Metro Park">Metro Park</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">4/5</div>
                  <p className="text-sm text-muted-foreground">Compliance documents</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Approval Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">75%</div>
                  <p className="text-sm text-muted-foreground">Documents approved</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Next Due</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">May 15</div>
                  <p className="text-sm text-muted-foreground">Quarterly returns</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>
                  Overview of all submitted compliance documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.project} • RERA: {item.rera} • {item.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(item.status)}
                        <span className="text-sm capitalize">{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <div className="flex items-center justify-between w-full">
                  <p className="text-xs text-muted-foreground">
                    Document status is updated in real-time as authorities review your submissions.
                  </p>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <FileText className="h-4 w-4" />
                    View All
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recycled Material Usage</CardTitle>
                <CardDescription>
                  Track purchase and utilization of recycled materials
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center border rounded-md">
                <div className="text-center">
                  <BarChart className="h-16 w-16 mx-auto text-muted-foreground/50 mb-2" />
                  <p className="text-muted-foreground">
                    Material usage charts will appear here
                  </p>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <p className="text-xs text-muted-foreground">
                  Based on marketplace purchases and material utilization data from your projects.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="submissions" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Submissions</CardTitle>
                <CardDescription>
                  History of all EPR and waste management submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="py-8 text-center text-muted-foreground">
                  Detailed submission history will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="certificates" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Certificates</CardTitle>
                <CardDescription>
                  All certificates and approvals for your projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="py-8 text-center text-muted-foreground">
                  Certificate repository will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ghg" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>GHG Credit Monitoring</CardTitle>
                <CardDescription>
                  Track greenhouse gas credits and carbon footprint
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="py-8 text-center text-muted-foreground">
                  GHG credit dashboard will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ComplianceTracker;
