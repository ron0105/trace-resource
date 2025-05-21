
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, FileUp, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";

const BOQSuggestions = () => {
  const { projectId } = useParams();

  // Mock suggested materials
  const suggestedMaterials = [
    { id: 1, name: "Recycled Concrete Aggregate", quantity: "120 tonnes", vendors: 5, minPrice: 2800, maxPrice: 3200 },
    { id: 2, name: "Fly Ash Bricks", quantity: "25,000 units", vendors: 8, minPrice: 6, maxPrice: 8 },
    { id: 3, name: "Reclaimed Wood Panels", quantity: "240 sq.m", vendors: 3, minPrice: 950, maxPrice: 1200 },
    { id: 4, name: "Recycled Plastic Sheets", quantity: "85 sheets", vendors: 4, minPrice: 1200, maxPrice: 1500 }
  ];

  return (
    <MainLayout pageTitle="BOQ Suggestions">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Bill of Quantities Suggestions</h1>
            {projectId !== "all" && <p className="text-muted-foreground">Project ID: {projectId}</p>}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <FileUp className="h-4 w-4" />
              Upload BOQ
            </Button>
            <Button variant="default" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search for materials..." 
            className="pl-10 h-10"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sustainable Material Recommendations</CardTitle>
            <CardDescription>
              Based on your project's BOQ and WMUP data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suggestedMaterials.map(material => (
                <div key={material.id} className="border rounded-lg p-4">
                  <div className="flex flex-col md:flex-row justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{material.name}</h3>
                      <p className="text-sm text-muted-foreground">Required: {material.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                      <div className="bg-primary/10 text-primary text-sm px-2 py-1 rounded">
                        {material.vendors} vendors available
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-sm">
                      Price range: ₹{material.minPrice} - ₹{material.maxPrice} per unit
                    </div>
                    <Button asChild size="sm">
                      <Link to={`/developer/marketplace/vendors?material=${material.id}`}>
                        View Vendors
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 flex justify-between">
            <p className="text-xs text-muted-foreground">
              Recommendations are based on availability, compliance requirements, and project location.
            </p>
            <Button size="sm">View All Materials</Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default BOQSuggestions;
