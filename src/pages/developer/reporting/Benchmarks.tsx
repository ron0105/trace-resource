
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart as BarChartIcon, PieChart, DownloadCloud, TrendingUp, TrendingDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Benchmarks = () => {
  return (
    <MainLayout pageTitle="Benchmarks">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Benchmark Comparison</h1>
            <p className="text-muted-foreground">Compare your sustainability metrics against industry standards</p>
          </div>
          <Button variant="outline" className="gap-2">
            <DownloadCloud className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Waste Diversion Rate</CardTitle>
                <div className="bg-green-50 text-green-600 flex items-center gap-1 px-2 py-1 rounded text-xs font-medium">
                  <TrendingUp className="h-3 w-3" />
                  12% above
                </div>
              </div>
              <CardDescription>Your performance vs. industry average</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-3xl font-bold">84%</div>
              <p className="text-sm text-muted-foreground">Industry average: 72%</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Recycled Content</CardTitle>
                <div className="bg-green-50 text-green-600 flex items-center gap-1 px-2 py-1 rounded text-xs font-medium">
                  <TrendingUp className="h-3 w-3" />
                  8% above
                </div>
              </div>
              <CardDescription>Percentage of recycled materials used</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-3xl font-bold">38%</div>
              <p className="text-sm text-muted-foreground">Industry average: 30%</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Carbon Footprint</CardTitle>
                <div className="bg-red-50 text-red-600 flex items-center gap-1 px-2 py-1 rounded text-xs font-medium">
                  <TrendingDown className="h-3 w-3" />
                  5% below
                </div>
              </div>
              <CardDescription>CO2e per square meter</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-3xl font-bold">420 kg</div>
              <p className="text-sm text-muted-foreground">Industry average: 400 kg</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Performance Comparison</CardTitle>
              <CardDescription>
                Your sustainability metrics compared to industry benchmarks
              </CardDescription>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Project Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border rounded-lg">
              <div className="text-center">
                <BarChartIcon className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">Bar chart showing comparison with industry benchmarks would appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sustainability Rating Breakdown</CardTitle>
            <CardDescription>
              Detailed breakdown of your sustainability metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <div className="h-40 w-40 flex items-center justify-center border rounded-full mb-4">
                  <PieChart className="h-12 w-12 text-muted-foreground/50" />
                </div>
                <h3 className="font-medium">Material Sourcing</h3>
                <p className="text-muted-foreground text-sm">72/100 points</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="h-40 w-40 flex items-center justify-center border rounded-full mb-4">
                  <PieChart className="h-12 w-12 text-muted-foreground/50" />
                </div>
                <h3 className="font-medium">Waste Management</h3>
                <p className="text-muted-foreground text-sm">84/100 points</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="h-40 w-40 flex items-center justify-center border rounded-full mb-4">
                  <PieChart className="h-12 w-12 text-muted-foreground/50" />
                </div>
                <h3 className="font-medium">Carbon Efficiency</h3>
                <p className="text-muted-foreground text-sm">65/100 points</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50">
            <p className="text-xs text-muted-foreground">
              Benchmark data is updated quarterly based on industry standards and regulatory requirements.
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Benchmarks;
