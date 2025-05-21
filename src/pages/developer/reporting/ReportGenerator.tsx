
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CheckSquare, Download, Settings, Calendar, PieChart } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const ReportGenerator = () => {
  const [reportType, setReportType] = useState<string>("");
  const [project, setProject] = useState<string>("");
  const [timePeriod, setTimePeriod] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [reportGenerated, setReportGenerated] = useState<boolean>(false);
  const { toast } = useToast();

  // Mock report types
  const reportTypes = [
    { id: "wmup", name: "WMUP Compliance Report", description: "Waste Management & Utilization Plan compliance status" },
    { id: "epr", name: "EPR Status Report", description: "Extended Producer Responsibility status and submissions" },
    { id: "quarterly", name: "Quarterly Returns Summary", description: "Summary of all quarterly submissions" },
    { id: "esg", name: "ESG Impact Report", description: "Environmental, Social, and Governance metrics" },
    { id: "cert", name: "Certification Report", description: "Summary of all compliance certificates" }
  ];

  const handleGenerateReport = () => {
    if (!reportType || !project || !timePeriod) {
      toast({
        title: "Missing Fields",
        description: "Please select all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
      toast({
        title: "Report Generated",
        description: "Your report has been successfully generated.",
      });
    }, 1500);
  };

  return (
    <MainLayout pageTitle="Report Generator">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Report Generator</h1>
            <p className="text-muted-foreground">Create custom compliance and sustainability reports</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            Report Settings
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Configuration</CardTitle>
              <CardDescription>
                Select the type of report and data to include
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compliance">Compliance Report</SelectItem>
                    <SelectItem value="sustainability">Sustainability Report</SelectItem>
                    <SelectItem value="certification">Certification Report</SelectItem>
                    <SelectItem value="audit">Audit Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Project Selection</Label>
                <Select value={project} onValueChange={setProject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select projects to include" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="greenfield">Greenfield Residences</SelectItem>
                    <SelectItem value="urban">Urban Heights</SelectItem>
                    <SelectItem value="metro">Metro Park</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Time Period</Label>
                <Select value={timePeriod} onValueChange={setTimePeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="q1-2025">Q1 2025</SelectItem>
                    <SelectItem value="q4-2024">Q4 2024</SelectItem>
                    <SelectItem value="q3-2024">Q3 2024</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Include Sections</Label>
                <div className="space-y-2 pt-2">
                  {reportTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox id={type.id} defaultChecked={type.id === "wmup" || type.id === "epr"} />
                      <div>
                        <Label htmlFor={type.id} className="font-medium">{type.name}</Label>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full" onClick={handleGenerateReport} disabled={isGenerating}>
                {isGenerating ? "Generating..." : "Generate Report"}
              </Button>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 text-xs text-muted-foreground">
              Report data is compiled from your compliance submissions, marketplace activities, and waste tracking records.
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Report Preview</CardTitle>
              <CardDescription>
                Preview of your generated report
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8 border-2 border-dashed rounded-lg">
              {reportGenerated ? (
                <div className="space-y-6 w-full px-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-medium">ESG Impact Report</h3>
                        <p className="text-xs text-muted-foreground">Q1 2025 • All Projects</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Generated on May 21, 2025
                    </div>
                  </div>
                  
                  <div className="border-t border-b py-3">
                    <h4 className="font-medium mb-2">Executive Summary</h4>
                    <p className="text-sm">This report provides an overview of compliance status and sustainability metrics across all projects for Q1 2025.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 py-2">
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-sm font-medium">Compliance Status</h5>
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-2xl font-semibold">92%</div>
                      <p className="text-xs text-muted-foreground">Overall compliance rate</p>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-sm font-medium">Material Recovery</h5>
                        <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      </div>
                      <div className="text-2xl font-semibold">78%</div>
                      <p className="text-xs text-muted-foreground">Recycled material usage</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center py-4">
                    <PieChart className="h-20 w-20 text-muted-foreground/50" />
                  </div>
                  
                  <Button variant="outline" className="gap-2 w-full">
                    <Download className="h-4 w-4" />
                    Download Full Report
                  </Button>
                </div>
              ) : (
                <>
                  <FileText className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <p className="text-center text-muted-foreground mb-2">
                    Configure and generate your report to see a preview
                  </p>
                  <Button variant="outline" className="gap-2" disabled>
                    <Download className="h-4 w-4" />
                    Download Preview
                  </Button>
                </>
              )}
            </CardContent>
            <CardFooter className="border-t bg-muted/50 flex justify-between">
              <div className="text-xs text-muted-foreground">
                Generated reports are saved in your download history.
              </div>
              <Button size="sm" variant="ghost" className="gap-1">
                <CheckSquare className="h-4 w-4" />
                Auto-Submit
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReportGenerator;
