
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag, Search } from "lucide-react";

const MarketplaceHome = () => {
  // Mock featured categories
  const categories = [
    { id: 1, name: "Recycled Aggregates", count: 48 },
    { id: 2, name: "Fly Ash Products", count: 35 },
    { id: 3, name: "Reclaimed Wood", count: 27 },
    { id: 4, name: "Recycled Plastics", count: 42 },
    { id: 5, name: "Alternative Cement", count: 19 },
    { id: 6, name: "Sustainable Insulation", count: 31 }
  ];

  return (
    <MainLayout pageTitle="Marketplace">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Sustainable Materials Marketplace</h1>
            <p className="text-muted-foreground">Source compliant materials from verified vendors</p>
          </div>
          <Button asChild>
            <Link to="/developer/marketplace/boq/all">View BOQ Suggestions</Link>
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search for materials, vendors, or certifications..." 
            className="pl-10 h-10"
          />
        </div>

        {/* Featured Categories */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Material Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map(category => (
              <Card key={category.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{category.name}</CardTitle>
                  <CardDescription>{category.count} products</CardDescription>
                </CardHeader>
                <CardFooter className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Browse Category
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>BOQ-Based Recommendations</CardTitle>
              <CardDescription>
                Get personalized material recommendations based on your project's Bill of Quantities
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-6">
              <div className="bg-primary/10 p-4 rounded-full mx-auto mb-4 w-fit">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Upload your BOQ or use your WMUP data to get tailored material suggestions
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/developer/marketplace/boq/all">
                  Get Recommendations
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vendor Directory</CardTitle>
              <CardDescription>
                Browse verified vendors with sustainability certifications
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-6">
              <div className="bg-primary/10 p-4 rounded-full mx-auto mb-4 w-fit">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Connect with pre-vetted vendors that meet compliance requirements
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/developer/marketplace/vendors">
                  Browse Vendors
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default MarketplaceHome;
