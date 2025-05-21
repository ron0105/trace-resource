
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const WasteDataEntry = () => {
  const { projectId } = useParams();

  return (
    <MainLayout pageTitle="Waste Data Entry">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Waste Data Entry</h1>
            <p className="text-muted-foreground">Project ID: {projectId}</p>
          </div>
          <Button>Save Data</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Record Project Waste Data</CardTitle>
            <CardDescription>
              Enter the details of waste generated and utilized at your project site
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Collection Date</Label>
                <Input type="date" id="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wasteType">Waste Type</Label>
                <Select>
                  <SelectTrigger id="wasteType">
                    <SelectValue placeholder="Select waste type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concrete">Concrete Debris</SelectItem>
                    <SelectItem value="steel">Steel Scrap</SelectItem>
                    <SelectItem value="wood">Wood Waste</SelectItem>
                    <SelectItem value="glass">Glass</SelectItem>
                    <SelectItem value="plastic">Plastic</SelectItem>
                    <SelectItem value="soil">Excavated Soil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity (tonnes)</Label>
                <Input type="number" id="quantity" placeholder="0.00" min="0" step="0.01" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recyclingMethod">Treatment/Recycling Method</Label>
                <Select>
                  <SelectTrigger id="recyclingMethod">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crushing">Crushing & Reuse</SelectItem>
                    <SelectItem value="melting">Melting & Recasting</SelectItem>
                    <SelectItem value="chipping">Chipping</SelectItem>
                    <SelectItem value="landfill">Landfill</SelectItem>
                    <SelectItem value="recycling">Recycling Facility</SelectItem>
                    <SelectItem value="reuse">Direct Reuse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="facility">Processing Facility/Vendor</Label>
              <Input id="facility" placeholder="Enter facility name" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Input id="notes" placeholder="Enter any additional details" />
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 flex justify-between">
            <p className="text-xs text-muted-foreground">
              This data will be used for quarterly returns and compliance reporting.
            </p>
            <Button size="sm">Add Entry</Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default WasteDataEntry;
