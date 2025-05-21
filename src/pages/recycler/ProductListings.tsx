
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Package, Upload, Star, FileText, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock product data
const materials = [
  { 
    id: "PRD001", 
    name: "Recycled Concrete Aggregate", 
    category: "Concrete", 
    price: "₹3,200 per ton",
    available: "45 tons",
    esgScore: 85,
    reviews: 12,
    rating: 4.5,
    orders: 8,
    certifications: ["ISO14001", "Green Product"],
    status: "Active"
  },
  { 
    id: "PRD002", 
    name: "Fly Ash Bricks", 
    category: "Bricks", 
    price: "₹5.50 per piece",
    available: "12,000 pcs",
    esgScore: 78,
    reviews: 8,
    rating: 4.3,
    orders: 5,
    certifications: ["GRIHA", "Low Carbon"],
    status: "Active"
  },
  { 
    id: "PRD003", 
    name: "Bamboo Wall Panels", 
    category: "Wall Materials", 
    price: "₹750 per sq.m",
    available: "120 sq.m",
    esgScore: 92,
    reviews: 4,
    rating: 4.8,
    orders: 3,
    certifications: ["FSC Certified", "LEED Compliant"],
    status: "Active"
  },
  { 
    id: "PRD004", 
    name: "Recycled Plastic Lumber", 
    category: "Structural", 
    price: "₹2,800 per unit",
    available: "35 units",
    esgScore: 88,
    reviews: 0,
    rating: 0,
    orders: 0,
    certifications: ["Low Carbon"],
    status: "New"
  }
];

// Mock data for recent orders
const recentOrders = [
  { 
    id: 'ORD1234', 
    customer: 'Dev Corp', 
    product: 'Recycled Concrete Aggregate', 
    quantity: '20 tons', 
    amount: '₹64,000',
    date: '2024-05-15',
    status: 'Delivered',
    feedback: {
      received: true,
      rating: 4,
      comment: "Good quality material, but particle size was inconsistent."
    }
  },
  { 
    id: 'ORD1233', 
    customer: 'GreenBuild Ltd', 
    product: 'Fly Ash Bricks', 
    quantity: '5,000 pcs', 
    amount: '₹27,500',
    date: '2024-05-14',
    status: 'In Transit',
    feedback: {
      received: false
    }
  },
  { 
    id: 'ORD1232', 
    customer: 'EcoHomes', 
    product: 'Bamboo Wall Panels', 
    quantity: '80 sq.m', 
    amount: '₹60,000',
    date: '2024-05-12',
    status: 'Delivered',
    feedback: {
      received: true,
      rating: 5,
      comment: "Perfect quality and on-time delivery."
    }
  }
];

// Mock product improvement suggestions
const improvementSuggestions = [
  {
    productId: "PRD001",
    productName: "Recycled Concrete Aggregate",
    suggestions: [
      "Reduce particle size variability",
      "Improve water retention properties",
      "Add certification for heavy metal testing"
    ]
  },
  {
    productId: "PRD002",
    productName: "Fly Ash Bricks",
    suggestions: [
      "Enhance compressive strength",
      "Consider additional weatherproofing"
    ]
  }
];

const ProductListings = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const { toast } = useToast();

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    unit: 'ton'
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.quantity) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Product Added",
      description: "Your product listing has been created and is pending ESG scoring.",
    });
    
    setShowAddDialog(false);
    setNewProduct({
      name: '',
      category: '',
      price: '',
      quantity: '',
      unit: 'ton'
    });
  };

  const handleViewFeedback = (order: any) => {
    setSelectedOrder(order);
    setShowFeedbackDialog(true);
  };

  const handleSendReminder = (orderId: string) => {
    toast({
      title: "Reminder Sent",
      description: `Feedback reminder sent to the buyer of order ${orderId}`,
    });
  };

  const handleApplyRecommendation = (productId: string) => {
    toast({
      title: "Improvement Applied",
      description: "The suggested improvement has been added to your action items.",
    });
  };

  // Display certification badges
  const CertificationBadges = ({ certifications }: { certifications: string[] }) => (
    <div className="flex flex-wrap gap-1 mt-1">
      {certifications.map((cert, index) => (
        <Badge key={index} variant="outline" className="text-xs">
          {cert}
        </Badge>
      ))}
    </div>
  );

  // Order status indicator
  const OrderStatus = ({ status }: { status: string }) => {
    if (status === 'Delivered') {
      return <div className="flex items-center gap-1 text-green-600 text-xs font-medium px-2 py-1 bg-green-50 rounded-full">
        <Check className="h-3 w-3" /> Delivered
      </div>;
    } else if (status === 'In Transit') {
      return <div className="flex items-center gap-1 text-blue-600 text-xs font-medium px-2 py-1 bg-blue-50 rounded-full">
        <Package className="h-3 w-3" /> In Transit
      </div>;
    } else {
      return <div className="flex items-center gap-1 text-amber-600 text-xs font-medium px-2 py-1 bg-amber-50 rounded-full">
        <AlertCircle className="h-3 w-3" /> Pending
      </div>;
    }
  };

  return (
    <MainLayout pageTitle="Product Listings & Orders">
      <Tabs defaultValue="listings" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="orders">Order Management</TabsTrigger>
          <TabsTrigger value="feedback">Feedback & Improvements</TabsTrigger>
        </TabsList>

        {/* Listings Tab */}
        <TabsContent value="listings" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">My Material Listings</h2>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>Add New Material</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Material Listing</DialogTitle>
                  <DialogDescription>
                    List your sustainable construction material for developers to purchase
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium mb-1 block">
                      Product Name
                    </label>
                    <input 
                      id="name"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      placeholder="e.g. Recycled Concrete Aggregate"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="text-sm font-medium mb-1 block">
                      Category
                    </label>
                    <select 
                      id="category"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    >
                      <option value="">Select a category</option>
                      <option value="Concrete">Concrete</option>
                      <option value="Bricks">Bricks</option>
                      <option value="Flooring">Flooring</option>
                      <option value="Paint">Paint</option>
                      <option value="Roofing">Roofing</option>
                      <option value="Wall Materials">Wall Materials</option>
                      <option value="Structural">Structural Materials</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="price" className="text-sm font-medium mb-1 block">
                        Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2">₹</span>
                        <input 
                          id="price"
                          className="w-full rounded-md border border-input bg-background pl-6 pr-3 py-2"
                          placeholder="e.g. 3200"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="unit" className="text-sm font-medium mb-1 block">
                        Unit
                      </label>
                      <select 
                        id="unit"
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        value={newProduct.unit}
                        onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                      >
                        <option value="ton">per ton</option>
                        <option value="sq.m">per sq.m</option>
                        <option value="piece">per piece</option>
                        <option value="liter">per liter</option>
                        <option value="kg">per kg</option>
                        <option value="unit">per unit</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="quantity" className="text-sm font-medium mb-1 block">
                      Available Quantity
                    </label>
                    <input 
                      id="quantity"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      placeholder="e.g. 500"
                      value={newProduct.quantity}
                      onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Upload Test Reports & Certification Documents
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        Drag & drop files here, or <span className="text-primary">browse</span>
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        Supports PDF, JPG, PNG (max 10MB each)
                      </p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddProduct}>
                    Add Product
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {materials.map((material) => (
              <Card key={material.id} className="border-b">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-lg">{material.name}</h3>
                          {material.status === "New" && (
                            <Badge className="ml-2 bg-blue-500">New</Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 mt-1">
                          <p className="text-sm text-muted-foreground">{material.category}</p>
                          <p className="text-sm">{material.price}</p>
                          <p className="text-sm text-muted-foreground">Available: {material.available}</p>
                        </div>
                        <CertificationBadges certifications={material.certifications} />
                        <div className="mt-3">
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-medium">ESG Score:</div>
                            <div className="w-32 bg-gray-200 rounded-full h-2.5">
                              <div 
                                className={`h-2.5 rounded-full ${
                                  material.esgScore >= 90 ? 'bg-green-500' : 
                                  material.esgScore >= 80 ? 'bg-green-400' :
                                  material.esgScore >= 70 ? 'bg-yellow-400' : 'bg-orange-500'
                                }`}
                                style={{ width: `${material.esgScore}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{material.esgScore}/100</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="text-sm flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span>{material.rating > 0 ? material.rating : 'No ratings'}</span>
                          <span className="text-muted-foreground">({material.reviews} reviews)</span>
                        </div>
                        <div className="text-sm flex items-center gap-2">
                          <Package className="h-4 w-4 text-primary" />
                          <span>{material.orders} orders</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button size="sm">View Buyers</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Orders & Deliveries</h2>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Feedback</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <OrderStatus status={order.status} />
                  </TableCell>
                  <TableCell>
                    {order.feedback.received ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                        Received
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {order.feedback.received ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewFeedback(order)}
                        >
                          View Feedback
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSendReminder(order.id)}
                        >
                          Send Reminder
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Feedback Dialog */}
          <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Order Feedback</DialogTitle>
                <DialogDescription>
                  {selectedOrder && `Feedback for order ${selectedOrder.id} from ${selectedOrder.customer}`}
                </DialogDescription>
              </DialogHeader>
              {selectedOrder && selectedOrder.feedback.received && (
                <div className="py-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`h-5 w-5 ${star <= selectedOrder.feedback.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="font-medium">{selectedOrder.feedback.rating}/5</span>
                  </div>
                  <div className="p-4 bg-muted rounded-md">
                    <p className="text-sm">{selectedOrder.feedback.comment}</p>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">System Recommendations</h4>
                    <ul className="space-y-2">
                      <li className="text-sm flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Consider more consistent particle sizing in your next batch</span>
                      </li>
                      <li className="text-sm flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Highlight water retention properties in your listing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button onClick={() => setShowFeedbackDialog(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Feedback & Improvements Tab */}
        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Improvement Suggestions</CardTitle>
              <CardDescription>AI-generated suggestions based on buyer feedback and market standards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {improvementSuggestions.map((item) => (
                  <div key={item.productId} className="border rounded-md p-4">
                    <h3 className="font-medium text-lg">{item.productName}</h3>
                    <ul className="mt-3 space-y-2">
                      {item.suggestions.map((suggestion, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm">{suggestion}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-end mt-4">
                      <Button 
                        size="sm" 
                        onClick={() => handleApplyRecommendation(item.productId)}
                      >
                        Apply Recommendations
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ESG Score Breakdown</CardTitle>
              <CardDescription>Understand what factors affect your product's sustainability score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Environmental Impact</span>
                    <span className="text-sm font-medium">84/100</span>
                  </div>
                  <Progress value={84} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on recycled content, energy consumption, and carbon footprint
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Social Responsibility</span>
                    <span className="text-sm font-medium">76/100</span>
                  </div>
                  <Progress value={76} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on labor practices, community impact, and health & safety
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Governance & Certification</span>
                    <span className="text-sm font-medium">92/100</span>
                  </div>
                  <Progress value={92} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on certifications, test reports, and compliance documentation
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 border rounded-md">
                <h4 className="font-medium mb-2">How to Improve Your ESG Score</h4>
                <ul className="space-y-2">
                  <li className="text-sm flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Upload additional third-party certifications</span>
                  </li>
                  <li className="text-sm flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Document your material sourcing process</span>
                  </li>
                  <li className="text-sm flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Add details about your manufacturing energy consumption</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default ProductListings;
