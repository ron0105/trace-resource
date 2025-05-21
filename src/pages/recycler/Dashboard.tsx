
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Package, ShoppingBag, AlertCircle, Check, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock sales data
const salesData = [
  { month: 'Jan', sales: 42000 },
  { month: 'Feb', sales: 47000 },
  { month: 'Mar', sales: 55000 },
  { month: 'Apr', sales: 52000 },
  { month: 'May', sales: 60000 },
  { month: 'Jun', sales: 68000 },
  { month: 'Jul', sales: 72000 },
  { month: 'Aug', sales: 85000 }
];

// Mock orders data
const recentOrders = [
  { 
    id: 'ORD1234', 
    customer: 'Dev Corp', 
    product: 'Recycled Concrete Aggregate', 
    quantity: '20 tons', 
    amount: '₹64,000',
    date: '2024-05-15',
    status: 'Pending' 
  },
  { 
    id: 'ORD1233', 
    customer: 'GreenBuild Ltd', 
    product: 'Fly Ash Bricks', 
    quantity: '5,000 pcs', 
    amount: '₹27,500',
    date: '2024-05-14',
    status: 'Confirmed' 
  },
  { 
    id: 'ORD1232', 
    customer: 'EcoHomes', 
    product: 'Bamboo Wall Panels', 
    quantity: '80 sq.m', 
    amount: '₹60,000',
    date: '2024-05-12',
    status: 'Delivered' 
  }
];

// Mock product data
const productStats = {
  totalProducts: 12,
  totalInventory: '165 tons',
  materialsRecycled: '95 tons',
  topProduct: 'Recycled Concrete Aggregate'
};

const RecyclerDashboard = () => {
  const [showAddListing, setShowAddListing] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    unit: 'ton'
  });
  const { toast } = useToast();

  const handleAddListing = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.quantity) {
      toast({
        title: "Missing Fields",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Product Added",
      description: "Your new product listing has been created.",
    });
    
    setShowAddListing(false);
    setNewProduct({
      name: '',
      category: '',
      price: '',
      quantity: '',
      unit: 'ton'
    });
  };

  // Order status indicator
  const OrderStatus = ({ status }: { status: string }) => {
    if (status === 'Delivered') {
      return <div className="status-badge bg-green-100 text-green-800">
        <Check className="mr-1 h-3 w-3" /> Delivered
      </div>;
    } else if (status === 'Confirmed') {
      return <div className="status-badge bg-blue-100 text-blue-800">
        <Package className="mr-1 h-3 w-3" /> Confirmed
      </div>;
    } else {
      return <div className="status-badge bg-yellow-100 text-yellow-800">
        <AlertCircle className="mr-1 h-3 w-3" /> Pending
      </div>;
    }
  };

  return (
    <MainLayout pageTitle="Vendor Dashboard">
      {/* Action Links */}
      <div className="flex gap-4 mb-6">
        <Link to="/recycler/dashboard">
          <Button variant="outline">Dashboard</Button>
        </Link>
        <Link to="/recycler/listings">
          <Button>Manage Listings</Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="dashboard-stat">₹4.85L</div>
            <p className="text-xs text-muted-foreground mt-2">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="dashboard-stat">8</div>
            <p className="text-xs text-muted-foreground mt-2">
              3 pending approval
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Listed Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="dashboard-stat">12</div>
            <p className="text-xs text-muted-foreground mt-2">
              4 need inventory updates
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vendor Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="dashboard-stat">4.7/5</div>
            <Progress value={4.7 * 20} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Monthly Sales</CardTitle>
          <CardDescription>Revenue from sustainable materials sales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value}`, 'Sales']} />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#0E9F6E" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Tabs */}
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="products">Product Summary</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders">
          <div className="flex justify-between items-center mb-4">
            <h2 className="dash-section-title">Recent Orders</h2>
            <Button>View All Orders</Button>
          </div>
          
          <div className="space-y-4">
            {recentOrders.map(order => (
              <Card key={order.id}>
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium">{order.product}</h4>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
                        <div className="flex items-center mt-1">
                          <p className="text-sm">{order.quantity}</p>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <p className="text-sm">{order.amount}</p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Order ID: {order.id} • {order.date}
                        </p>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        <OrderStatus status={order.status} />
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          {order.status === 'Pending' && (
                            <Button size="sm">Accept Order</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="products">
          <div className="flex justify-between items-center mb-4">
            <h2 className="dash-section-title">Product Inventory</h2>
            <Dialog open={showAddListing} onOpenChange={setShowAddListing}>
              <DialogTrigger asChild>
                <Button>Add New Listing</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Material Listing</DialogTitle>
                  <DialogDescription>
                    Add a sustainable construction material to your marketplace inventory
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
                    <label htmlFor="certificates" className="text-sm font-medium mb-1 block">
                      Certifications
                    </label>
                    <select 
                      id="certificates"
                      multiple
                      className="w-full rounded-md border border-input bg-background px-3 py-2 h-24"
                    >
                      <option value="iso14001">ISO 14001</option>
                      <option value="greenProduct">Green Product</option>
                      <option value="fsc">FSC Certified</option>
                      <option value="griha">GRIHA</option>
                      <option value="lowCarbon">Low Carbon</option>
                      <option value="leed">LEED Compliant</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddListing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddListing}>
                    Add Product
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Product Stats Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <ShoppingBag className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Total Products</h3>
                <div className="text-2xl font-bold">{productStats.totalProducts}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <Package className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Total Inventory</h3>
                <div className="text-2xl font-bold">{productStats.totalInventory}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <AlertCircle className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Materials Recycled</h3>
                <div className="text-2xl font-bold">{productStats.materialsRecycled}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <Check className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Top Product</h3>
                <div className="font-bold text-md mt-1">{productStats.topProduct}</div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
              <CardDescription>Improve your product listings and increase sales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium flex items-center">
                    <div className="bg-primary/10 p-1.5 rounded-full mr-2">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    Complete Your Profile
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add your company details, certifications, and production process to build trust with buyers
                  </p>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium flex items-center">
                    <div className="bg-primary/10 p-1.5 rounded-full mr-2">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    Add Product Photos
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Materials with photos get 3x more inquiries than those without
                  </p>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium flex items-center">
                    <div className="bg-primary/10 p-1.5 rounded-full mr-2">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    Upload Certification Documents
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Verified certifications increase buyer trust and conversion rates
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default RecyclerDashboard;
