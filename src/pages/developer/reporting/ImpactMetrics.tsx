
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3 } from "lucide-react";

const ImpactMetrics = () => {
  const { projectId } = useParams();

  return (
    <MainLayout pageTitle="Impact Metrics">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">ESG Impact Metrics</h1>
            <p className="text-muted-foreground">Project ID: {projectId || 'All Projects'}</p>
          </div>
          <Button>Generate Report</Button>
        </div>

        <Tabs defaultValue="environmental" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="environmental">Environmental</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="environmental" className="mt-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact Overview</CardTitle>
                <CardDescription>
                  Key metrics showing your environmental performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center py-8">
                  <div className="text-center">
                    <div className="bg-primary/10 p-4 rounded-full mx-auto mb-4">
                      <BarChart3 className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">Metrics Dashboard</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      View detailed charts and analytics for this project
                    </p>
                    <Button>View Detailed Metrics</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-4">
                <p className="text-xs text-muted-foreground">
                  Data is automatically aggregated from your compliance submissions and marketplace transactions
                </p>
              </CardFooter>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Carbon Footprint</CardTitle>
                </CardHeader>
                <CardContent className="text-center py-6">
                  <div className="py-8 text-center">
                    <span className="text-4xl font-bold text-primary">68%</span>
                    <p className="text-sm text-muted-foreground mt-2">
                      Reduction vs. industry benchmark
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-3">
                  <Button variant="outline" size="sm" className="w-full">View Details</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Waste Diverted</CardTitle>
                </CardHeader>
                <CardContent className="text-center py-6">
                  <div className="py-8 text-center">
                    <span className="text-4xl font-bold text-primary">84%</span>
                    <p className="text-sm text-muted-foreground mt-2">
                      Of waste diverted from landfills
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-3">
                  <Button variant="outline" size="sm" className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="social" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Social Impact Metrics</CardTitle>
                <CardDescription>
                  Data on social responsibility and community engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="py-8 text-center text-muted-foreground">
                  Social impact metrics will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="governance" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Governance Metrics</CardTitle>
                <CardDescription>
                  Compliance tracking and governance indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="py-8 text-center text-muted-foreground">
                  Governance metrics will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ImpactMetrics;
