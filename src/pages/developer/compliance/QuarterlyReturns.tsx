
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Send } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const QuarterlyReturns = () => {
  const { projectId } = useParams();

  return (
    <MainLayout pageTitle="Quarterly Returns">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Quarterly Returns</h1>
            <p className="text-muted-foreground">Project ID: {projectId}</p>
          </div>
          <Button>View Submission History</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generate & Submit Quarterly Returns</CardTitle>
            <CardDescription>
              Create and submit quarterly returns for Construction & Demolition waste
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Select>
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quarter">Quarter</Label>
                <Select>
                  <SelectTrigger id="quarter">
                    <SelectValue placeholder="Select quarter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="q1">Q1 (Jan-Mar)</SelectItem>
                    <SelectItem value="q2">Q2 (Apr-Jun)</SelectItem>
                    <SelectItem value="q3">Q3 (Jul-Sep)</SelectItem>
                    <SelectItem value="q4">Q4 (Oct-Dec)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full">Generate Return</Button>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Return Preview</h3>
                    <p className="text-sm text-muted-foreground">Q1 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Due: April 15, 2025</span>
                </div>
              </div>
              
              <div className="bg-muted/30 p-3 rounded-lg text-sm mb-4">
                <p className="font-medium mb-2">Summary of Waste Generated & Processed</p>
                <ul className="space-y-1">
                  <li>• Total Waste Generated: 230 tonnes</li>
                  <li>• Waste Processed/Recycled: 195 tonnes</li>
                  <li>• Waste Sent to Landfill: 35 tonnes</li>
                  <li>• Certificates Received: 4</li>
                </ul>
              </div>
              
              <Button className="w-full gap-2">
                <Send className="h-4 w-4" />
                Submit Return to Authorities
              </Button>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50">
            <p className="text-xs text-muted-foreground">
              Quarterly returns must be submitted within 15 days of the quarter ending, as per regulatory requirements.
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default QuarterlyReturns;
