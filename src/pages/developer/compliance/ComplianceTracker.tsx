
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

const ComplianceTracker = () => {
  // Mock compliance items
  const complianceItems = [
    { id: 1, name: "WMUP Submission", status: "approved", project: "Greenfield Residences", date: "2025-03-15" },
    { id: 2, name: "EPR Registration", status: "pending", project: "Urban Heights", date: "2025-04-02" },
    { id: 3, name: "Quarterly Returns Q1", status: "rejected", project: "Sunrise Complex", date: "2025-04-10" },
    { id: 4, name: "Certificate Upload", status: "approved", project: "Metro Park", date: "2025-03-28" },
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

  return (
    <MainLayout pageTitle="Compliance Tracker">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Compliance Tracker</h1>
            <p className="text-muted-foreground">Track the status of all compliance documents and submissions</p>
          </div>
          <Button>View All Projects</Button>
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
              {complianceItems.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.project} • {item.date}</p>
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
            <p className="text-xs text-muted-foreground">
              Document status is updated in real-time as authorities review your submissions.
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ComplianceTracker;
