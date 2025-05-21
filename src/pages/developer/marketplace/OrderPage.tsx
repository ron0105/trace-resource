
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Truck, ShoppingCart, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const OrderPage = () => {
  const { vendorId } = useParams();

  // Mock vendor data
  const vendor = {
    name: "GreenBuild Recyclers",
    location: "Mumbai, MH",
    certified: true
  };

  // Mock products
  const products = [
    { 
      id: 1, 
      name: "Recycled Concrete Aggregate", 
      price: 3000, 
      unit: "per tonne",
      availability: "In Stock",
      minOrder: 5,
      rating: 4.5,
      certification: "BIS Certified"
    },
    { 
      id: 2, 
      name: "Fly Ash Bricks", 
      price: 7, 
      unit: "per brick",
      availability: "In Stock",
      minOrder: 1000,
      rating: 4.7,
      certification: "BIS Certified"
    }
  ];

  return (
    <MainLayout pageTitle={`Order from ${vendor.name}`}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{vendor.name}</h1>
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground">{vendor.location}</p>
              {vendor.certified && (
                <Badge variant="outline" className="flex gap-1 text-green-600 border-green-200 bg-green-50">
                  <CheckCircle className="h-3 w-3" />
                  Certified
                </Badge>
              )}
            </div>
          </div>
          <Button className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            View Cart
          </Button>
        </div>

        <div className="grid gap-4">
          {products.map(product => (
            <Card key={product.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{product.certification}</Badge>
                      <Badge variant="outline" className="bg-green-50 border-green-200 text-green-600">
                        {product.availability}
                      </Badge>
                    </div>
                    <p className="font-medium text-xl mb-1">₹{product.price} <span className="text-sm text-muted-foreground">{product.unit}</span></p>
                    <p className="text-sm text-muted-foreground mb-4">Minimum order: {product.minOrder} units</p>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Truck className="h-4 w-4" />
                      <span>Delivery available</span>
                      <span className="mx-1">•</span>
                      <Clock className="h-4 w-4" />
                      <span>3-5 business days</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 bg-muted/30 p-4 rounded-lg space-y-4">
                    <div>
                      <Label htmlFor={`qty-${product.id}`}>Quantity</Label>
                      <div className="flex gap-2 mt-1">
                        <Input id={`qty-${product.id}`} type="number" min={product.minOrder} defaultValue={product.minOrder} className="w-24" />
                        <Select defaultValue="tonnes">
                          <SelectTrigger className="w-28">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tonnes">Tonnes</SelectItem>
                            <SelectItem value="units">Units</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button className="w-full">Add to Cart</Button>
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

export default OrderPage;
