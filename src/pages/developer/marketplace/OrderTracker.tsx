
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PackageCheck, Truck, Check, Package, CircleDashed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OrderTracker = () => {
  // Mock orders
  const orders = [
    { 
      id: "ORD-23891", 
      date: "2025-04-12", 
      vendor: "GreenBuild Recyclers",
      status: "delivered",
      items: [
        { name: "Recycled Concrete Aggregate", quantity: "25 tonnes", price: 75000 }
      ],
      project: "Greenfield Residences",
      total: 75000
    },
    { 
      id: "ORD-23765", 
      date: "2025-04-05", 
      vendor: "EcoTech Materials",
      status: "in-transit",
      items: [
        { name: "Reclaimed Wood Panels", quantity: "120 sq.m", price: 118000 },
        { name: "Recycled Plastic Sheets", quantity: "50 sheets", price: 65000 }
      ],
      project: "Urban Heights",
      total: 183000
    },
    { 
      id: "ORD-23492", 
      date: "2025-03-28", 
      vendor: "GreenBuild Recyclers",
      status: "processed",
      items: [
        { name: "Fly Ash Bricks", quantity: "15000 units", price: 105000 }
      ],
      project: "Metro Park",
      total: 105000
    }
  ];

  // Status icon mapping
  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered':
        return <PackageCheck className="h-5 w-5 text-green-500" />;
      case 'in-transit':
        return <Truck className="h-5 w-5 text-amber-500" />;
      case 'processed':
        return <Package className="h-5 w-5 text-blue-500" />;
      default:
        return <CircleDashed className="h-5 w-5 text-muted-foreground" />;
    }
  };

  // Status label mapping
  const getStatusLabel = (status) => {
    switch(status) {
      case 'delivered':
        return "Delivered";
      case 'in-transit':
        return "In Transit";
      case 'processed':
        return "Processed";
      default:
        return "Pending";
    }
  };

  return (
    <MainLayout pageTitle="Order Tracker">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Order Tracker</h1>
            <p className="text-muted-foreground">Track and manage your marketplace orders</p>
          </div>
          <Button>Place New Order</Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="in-transit">In Transit</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="space-y-4">
              {orders.map(order => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{order.id}</h3>
                          <Badge variant="outline" className="capitalize">
                            {getStatusLabel(order.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Ordered on {order.date} • {order.vendor}
                        </p>
                        <p className="text-sm">Project: {order.project}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-4 md:mt-0">
                        {getStatusIcon(order.status)}
                        <Button size="sm">Track Details</Button>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 rounded-lg p-3 mb-3">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between py-1">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.quantity}</p>
                          </div>
                          <p className="font-medium">₹{item.price.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Invoice</Button>
                        <Button size="sm" variant="outline">Support</Button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="font-bold">₹{order.total.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="in-transit">
            <div className="space-y-4">
              {orders.filter(o => o.status === 'in-transit').map(order => (
                <Card key={order.id}>
                  {/* Similar content structure as above */}
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{order.id}</h3>
                          <Badge variant="outline" className="capitalize">
                            {getStatusLabel(order.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Ordered on {order.date} • {order.vendor}
                        </p>
                        <p className="text-sm">Project: {order.project}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-4 md:mt-0">
                        {getStatusIcon(order.status)}
                        <Button size="sm">Track Details</Button>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 rounded-lg p-3 mb-3">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between py-1">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.quantity}</p>
                          </div>
                          <p className="font-medium">₹{item.price.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Invoice</Button>
                        <Button size="sm" variant="outline">Support</Button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="font-bold">₹{order.total.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="delivered">
            <div className="space-y-4">
              {orders.filter(o => o.status === 'delivered').map(order => (
                <Card key={order.id}>
                  {/* Similar content structure as above */}
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{order.id}</h3>
                          <Badge variant="outline" className="capitalize">
                            {getStatusLabel(order.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Ordered on {order.date} • {order.vendor}
                        </p>
                        <p className="text-sm">Project: {order.project}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-4 md:mt-0">
                        {getStatusIcon(order.status)}
                        <Button size="sm">Track Details</Button>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 rounded-lg p-3 mb-3">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between py-1">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.quantity}</p>
                          </div>
                          <p className="font-medium">₹{item.price.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Invoice</Button>
                        <Button size="sm" variant="outline">Support</Button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="font-bold">₹{order.total.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default OrderTracker;
