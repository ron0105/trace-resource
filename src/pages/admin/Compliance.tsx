
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, CheckSquare, AlertTriangle, UserCheck } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminCompliance = () => {
  const [activeTab, setActiveTab] = useState("submissions");

  return (
    <MainLayout pageTitle="Compliance Management">
      <Tabs defaultValue="submissions" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
        </TabsList>

        <TabsContent value="submissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Submissions</CardTitle>
              <CardDescription>Manage and review client submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Submission ID</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4].map((i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">SUB-{1000 + i}</TableCell>
                      <TableCell>Project {i}</TableCell>
                      <TableCell>{i % 2 === 0 ? 'WMUP' : 'EPR'}</TableCell>
                      <TableCell>2023-05-{10 + i}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          i === 1 ? 'bg-green-100 text-green-800' : 
                          i === 2 ? 'bg-amber-100 text-amber-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {i === 1 ? 'Approved' : i === 2 ? 'Pending' : 'Flagged'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">Review</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Review Assignments</CardTitle>
              <CardDescription>Manage reviewer assignments for submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Submission</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Assigned Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3].map((i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">SUB-{1000 + i}</TableCell>
                      <TableCell>{i === 3 ? 'Unassigned' : `Reviewer ${i}`}</TableCell>
                      <TableCell>{i === 3 ? '-' : `2023-05-${10 + i}`}</TableCell>
                      <TableCell>{i === 3 ? '-' : `2023-05-${20 + i}`}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          i === 1 ? 'bg-green-100 text-green-800' : 
                          i === 2 ? 'bg-amber-100 text-amber-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {i === 1 ? 'Completed' : i === 2 ? 'In Progress' : 'Not Started'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          {i === 3 ? <><UserCheck className="mr-2 h-4 w-4" />Assign</> : 'View'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parameters" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Parameters</CardTitle>
              <CardDescription>Manage compliance parameters and thresholds</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead>Threshold</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "Waste Diversion Rate",
                      description: "Percentage of waste diverted from landfill",
                      required: true,
                      threshold: "≥ 75%"
                    },
                    {
                      name: "Recycled Content",
                      description: "Percentage of recycled materials used",
                      required: true,
                      threshold: "≥ 20%"
                    },
                    {
                      name: "EPR Documentation",
                      description: "Complete EPR documentation submitted",
                      required: true,
                      threshold: "100%"
                    },
                    {
                      name: "Water Conservation",
                      description: "Water conservation measures implemented",
                      required: false,
                      threshold: "Optional"
                    }
                  ].map((param, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{param.name}</TableCell>
                      <TableCell>{param.description}</TableCell>
                      <TableCell>{param.required ? "Yes" : "No"}</TableCell>
                      <TableCell>{param.threshold}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <CheckSquare className="mr-2 h-4 w-4" />
                Update Parameters
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default AdminCompliance;
