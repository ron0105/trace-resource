
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, PackageCheck, Truck, Clock } from "lucide-react";

const Orders = () => {
  // Mock orders for recycler
  const orders = [
    { 
      id: "ORD-24567", 
      date: "2025-05-15", 
      client: "Greenfield Residences",
      status: "completed",
      items: [
        { name: "Recycled Concrete Aggregate", quantity: "25 tonnes", price: 75000 }
      ],
      feedback: "Great quality, will order again",
      total: 75000
    },
    { 
      id: "ORD-24765", 
      date: "2025-05-18", 
      client: "Urban Heights",
      status: "processing",
      items: [
        { name: "Reclaimed Wood Panels", quantity: "120 sq.m", price: 118000 },
      ],
      total: 118000
    },
    { 
      id: "ORD-24892", 
      date: "2025-05-20", 
      client: "Metro Park",
      status: "shipped",
      items: [
        { name: "Fly Ash Bricks", quantity: "15000 units", price: 105000 }
      ],
      total: 105000
    }
  ];

  // Status icon mapping
  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <PackageCheck className="h-5 w-5 text-green-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-amber-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  // Status label mapping
  const getStatusLabel = (status) => {
    switch(status) {
      case 'completed':
        return "Completed";
      case 'shipped':
        return "Shipped";
      case 'processing':
        return "Processing";
      default:
        return "Pending";
    }
  };

  return (
    <MainLayout pageTitle="Orders">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Order Management</h1>
            <p className="text-muted-foreground">Manage and track your customer orders</p>
          </div>
          <Button>Update Inventory</Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
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
                          Order date: {order.date} • Client: {order.client}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-4 md:mt-0">
                        {getStatusIcon(order.status)}
                        <Button size="sm">Update Status</Button>
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
                    
                    {order.feedback && (
                      <div className="border-t pt-3 mt-3">
                        <p className="text-sm font-medium">Customer Feedback:</p>
                        <p className="text-sm text-muted-foreground">{order.feedback}</p>
                      </div>
                    )}
                    
                    <div className="flex justify-between mt-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Generate Invoice</Button>
                        <Button size="sm" variant="outline">Contact Client</Button>
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
          
          {/* Filtered tabs for each status */}
          {['processing', 'shipped', 'completed'].map(statusFilter => (
            <TabsContent key={statusFilter} value={statusFilter}>
              <div className="space-y-4">
                {orders
                  .filter(o => o.status === statusFilter)
                  .map(order => (
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
                              Order date: {order.date} • Client: {order.client}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-4 md:mt-0">
                            {getStatusIcon(order.status)}
                            <Button size="sm">Update Status</Button>
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
                        
                        {order.feedback && (
                          <div className="border-t pt-3 mt-3">
                            <p className="text-sm font-medium">Customer Feedback:</p>
                            <p className="text-sm text-muted-foreground">{order.feedback}</p>
                          </div>
                        )}
                        
                        <div className="flex justify-between mt-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Generate Invoice</Button>
                            <Button size="sm" variant="outline">Contact Client</Button>
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
          ))}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Orders;
