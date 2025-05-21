
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, MapPin, CheckCircle, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const VendorDirectory = () => {
  // Mock vendors
  const vendors = [
    { 
      id: 1, 
      name: "GreenBuild Recyclers", 
      location: "Mumbai, MH", 
      distance: "12 km",
      rating: 4.7,
      reviews: 38,
      certified: true,
      materials: ["Recycled Aggregates", "Fly Ash Bricks"]
    },
    { 
      id: 2, 
      name: "EcoTech Materials", 
      location: "Thane, MH", 
      distance: "25 km",
      rating: 4.5,
      reviews: 24,
      certified: true,
      materials: ["Reclaimed Wood", "Recycled Plastics"]
    },
    { 
      id: 3, 
      name: "Urban Recyclers", 
      location: "Navi Mumbai, MH", 
      distance: "18 km",
      rating: 4.3,
      reviews: 19,
      certified: false,
      materials: ["Recycled Aggregates", "Metal Scrap"]
    }
  ];

  return (
    <MainLayout pageTitle="Vendor Directory">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Vendor Directory</h1>
            <p className="text-muted-foreground">Connect with certified sustainable material suppliers</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search for vendors by name, location, or materials..." 
            className="pl-10 h-10"
          />
        </div>

        <div className="grid gap-4">
          {vendors.map(vendor => (
            <Card key={vendor.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold">{vendor.name}</h3>
                      {vendor.certified && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{vendor.location}</span>
                      <span>•</span>
                      <span>{vendor.distance}</span>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {vendor.materials.map((material, index) => (
                        <Badge key={index} variant="outline">{material}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{vendor.rating}</span>
                      <span className="text-sm text-muted-foreground">({vendor.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex md:flex-col gap-2 md:items-end">
                    <Button asChild variant="default">
                      <Link to={`/developer/marketplace/order/${vendor.id}`}>
                        View Products
                      </Link>
                    </Button>
                    <Button variant="outline">Contact</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default VendorDirectory;
