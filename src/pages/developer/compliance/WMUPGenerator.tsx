
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const WMUPGenerator = () => {
  const { projectId } = useParams();

  return (
    <MainLayout pageTitle="WMUP/WUP Generator">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">WMUP/WUP Generator</h1>
            <p className="text-muted-foreground">Project ID: {projectId}</p>
          </div>
          <Button>Generate WMUP</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Waste Management & Utilization Plan Generator</CardTitle>
            <CardDescription>
              Generate a compliant WMUP using your project data and AI assistance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>This tool helps you create a comprehensive Waste Management & Utilization Plan (WMUP) for your construction project. The generator will use your project details, location, and material requirements to create a plan that meets all regulatory requirements.</p>
            
            <div className="flex justify-center py-8">
              <div className="text-center">
                <div className="bg-primary/10 p-4 rounded-full mx-auto mb-4">
                  <FileText className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Input Project Data</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  To create your WMUP, we'll need key information about your project
                </p>
                <Button>Start WMUP Generation</Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 px-6 py-4">
            <p className="text-xs text-muted-foreground">
              The generated WMUP will be compliant with the Construction & Demolition Waste Management Rules, 2016 and latest CPCB guidelines.
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default WMUPGenerator;
