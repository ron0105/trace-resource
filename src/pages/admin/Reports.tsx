
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Share, ChartBar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const AdminReports = () => {
  const { toast } = useToast();

  const handleShareReport = (reportId: string) => {
    toast({
      title: "Report Shared",
      description: `Report ${reportId} has been shared with stakeholders`,
    });
  };

  return (
    <MainLayout pageTitle="Admin Reports">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Generated Reports</CardTitle>
            <CardDescription>View and manage all system-generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Generated For</TableHead>
                  <TableHead>Generated On</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { 
                    id: "RPT001", 
                    type: "ESG Summary", 
                    client: "Dev Corp", 
                    date: "2023-05-15", 
                    status: "Final" 
                  },
                  { 
                    id: "RPT002", 
                    type: "Compliance Report", 
                    client: "EcoBuilders", 
                    date: "2023-05-14", 
                    status: "Draft" 
                  },
                  { 
                    id: "RPT003", 
                    type: "Quarterly Returns", 
                    client: "Lake Realty", 
                    date: "2023-05-12", 
                    status: "Final" 
                  },
                  { 
                    id: "RPT004", 
                    type: "Waste Analysis", 
                    client: "Mountain Developers", 
                    date: "2023-05-10", 
                    status: "Under Review" 
                  }
                ].map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{report.client}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        report.status === 'Final' ? 'bg-green-100 text-green-800' : 
                        report.status === 'Draft' ? 'bg-amber-100 text-amber-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {report.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShareReport(report.id)}
                        >
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>ESG Performance Trends</CardTitle>
              <CardDescription>Environmental, Social, and Governance metrics over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <ChartBar className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p>ESG Performance Chart</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => toast({ 
                  title: "Report Generated", 
                  description: "ESG performance report has been generated" 
                })} 
                className="w-full"
              >
                Generate ESG Performance Report
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stakeholder Reports</CardTitle>
              <CardDescription>Reports to share with stakeholders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-medium">Quarterly Compliance Summary</h3>
                        <p className="text-xs text-muted-foreground">For all clients, Q2 2023</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleShareReport('QCS-Q2')} 
                      size="sm"
                    >
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-medium">ESG Impact Report</h3>
                        <p className="text-xs text-muted-foreground">Annual summary, 2023</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleShareReport('ESG-2023')} 
                      size="sm"
                    >
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Generate New Stakeholder Report
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminReports;
