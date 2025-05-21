
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardCheck } from "lucide-react";

const EPRForm = () => {
  const { projectId } = useParams();

  return (
    <MainLayout pageTitle="EPR Form Submission">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Extended Producer Responsibility (EPR) Form</h1>
            <p className="text-muted-foreground">Project ID: {projectId}</p>
          </div>
          <Button>Save & Submit</Button>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General Information</TabsTrigger>
            <TabsTrigger value="waste">Waste Details</TabsTrigger>
            <TabsTrigger value="recycling">Recycling Plan</TabsTrigger>
            <TabsTrigger value="certification">Certification</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>General Project Information</CardTitle>
                <CardDescription>
                  Basic details about your project and organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Fill in the general information about your project, including contact details, project scope, and timeline. This section forms the basis of your EPR submission.</p>
                
                <div className="flex justify-center py-8">
                  <div className="text-center">
                    <div className="bg-primary/10 p-4 rounded-full mx-auto mb-4">
                      <ClipboardCheck className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">EPR Form Wizard</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Our wizard will guide you through the EPR submission process
                    </p>
                    <Button>Start Form Completion</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-4">
                <p className="text-xs text-muted-foreground">
                  Your EPR form will be automatically validated against the latest regulatory requirements
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="waste" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Waste Generation Details</CardTitle>
                <CardDescription>
                  Information about expected waste types and volumes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="py-8 text-center text-muted-foreground">
                  Complete the General Information section first
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recycling" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recycling & Recovery Plan</CardTitle>
                <CardDescription>
                  Details on how waste will be recycled and recovered
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="py-8 text-center text-muted-foreground">
                  Complete the Waste Details section first
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="certification" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Certification & Declaration</CardTitle>
                <CardDescription>
                  Final review and certification of EPR submission
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="py-8 text-center text-muted-foreground">
                  Complete all previous sections first
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default EPRForm;
