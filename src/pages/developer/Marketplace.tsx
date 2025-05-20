
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ShoppingBag, Star, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock material data
const materialsData = [
  {
    id: 'MAT001',
    name: 'Recycled Concrete Aggregate',
    category: 'Concrete',
    price: '₹3,200/ton',
    vendor: 'EcoMaterials Ltd.',
    vendorRating: 4.7,
    certification: ['ISO 14001', 'Green Product'],
    availability: 'In Stock',
    location: 'Delhi NCR',
    image: 'concrete_aggregate.jpg'
  },
  {
    id: 'MAT002',
    name: 'Fly Ash Bricks',
    category: 'Bricks',
    price: '₹5.50/piece',
    vendor: 'GreenBuild Solutions',
    vendorRating: 4.3,
    certification: ['GRIHA', 'Low Carbon'],
    availability: 'In Stock',
    location: 'Mumbai',
    image: 'fly_ash_bricks.jpg'
  },
  {
    id: 'MAT003',
    name: 'Reclaimed Wood Flooring',
    category: 'Flooring',
    price: '₹950/sq.m',
    vendor: 'Heritage Timber Co.',
    vendorRating: 4.9,
    certification: ['FSC Certified', 'Zero Waste'],
    availability: 'Made to Order',
    location: 'Bangalore',
    image: 'reclaimed_wood.jpg'
  },
  {
    id: 'MAT004',
    name: 'Low-VOC Interior Paint',
    category: 'Paint',
    price: '₹480/liter',
    vendor: 'EcoCoat Paints',
    vendorRating: 4.5,
    certification: ['GreenSeal', 'LEED Compliant'],
    availability: 'In Stock',
    location: 'Multiple Locations',
    image: 'low_voc_paint.jpg'
  },
  {
    id: 'MAT005',
    name: 'Solar Reflective Roof Tiles',
    category: 'Roofing',
    price: '₹85/piece',
    vendor: 'SunReflect Technologies',
    vendorRating: 4.6,
    certification: ['IGBC Approved', 'Energy Star'],
    availability: 'In Stock',
    location: 'Hyderabad',
    image: 'solar_roof_tiles.jpg'
  },
  {
    id: 'MAT006',
    name: 'Bamboo Wall Panels',
    category: 'Wall Materials',
    price: '₹750/sq.m',
    vendor: 'Nature Build Co.',
    vendorRating: 4.4,
    certification: ['Carbon Neutral', 'Sustainable Harvest'],
    availability: 'In Stock',
    location: 'Kolkata',
    image: 'bamboo_panels.jpg'
  }
];

// Mock categories
const categories = [
  'All Categories', 'Concrete', 'Bricks', 'Flooring', 'Paint', 'Roofing', 'Wall Materials'
];

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedMaterial, setSelectedMaterial] = useState<null | typeof materialsData[0]>(null);
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const { toast } = useToast();

  // Filter materials based on search term and category
  const filteredMaterials = materialsData.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        material.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || material.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Handle requesting a quote
  const handleRequestQuote = () => {
    if (!quantity || !deliveryDate) {
      toast({
        title: "Missing Information",
        description: "Please provide quantity and delivery date.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Quote Requested",
      description: `Your quote request has been sent to ${selectedMaterial?.vendor}.`,
    });
    
    setQuoteDialogOpen(false);
    setQuantity('');
    setDeliveryDate('');
  };

  return (
    <MainLayout pageTitle="Marketplace">
      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search sustainable materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 py-2"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        {/* Active filters */}
        {(searchTerm || selectedCategory !== 'All Categories') && (
          <div className="flex gap-2 flex-wrap">
            {searchTerm && (
              <div className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm">
                Search: {searchTerm}
                <button 
                  onClick={() => setSearchTerm('')}
                  className="ml-1 rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            {selectedCategory !== 'All Categories' && (
              <div className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm">
                Category: {selectedCategory}
                <button 
                  onClick={() => setSelectedCategory('All Categories')}
                  className="ml-1 rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map(material => (
          <Card key={material.id} className="overflow-hidden">
            <div className="aspect-video bg-muted relative">
              {/* Placeholder for material image */}
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <ShoppingBag className="h-10 w-10 text-muted-foreground opacity-20" />
              </div>
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{material.name}</CardTitle>
                  <CardDescription>{material.category}</CardDescription>
                </div>
                <div className="bg-primary/10 text-primary font-medium px-2 py-1 rounded text-sm">
                  {material.price}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Vendor: </span>
                <span className="font-medium">{material.vendor}</span>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium">{material.vendorRating}/5.0</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {material.certification.map((cert, index) => (
                  <span key={index} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium">
                    {cert}
                  </span>
                ))}
              </div>
              
              <div className="text-sm">
                <span className="text-muted-foreground">Location: </span>
                <span>{material.location}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => {
                  setSelectedMaterial(material);
                  setQuoteDialogOpen(true);
                }}
              >
                Request Quote
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium mb-1">No materials found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter criteria
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All Categories');
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      )}

      {/* Quote Request Dialog */}
      <Dialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Quote</DialogTitle>
            <DialogDescription>
              Request pricing for {selectedMaterial?.name} from {selectedMaterial?.vendor}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Material
              </label>
              <Input value={selectedMaterial?.name} disabled />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">
                Quantity Required
              </label>
              <Input
                placeholder={`Enter quantity (in ${selectedMaterial?.price?.split('/')[1]})`}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">
                Required Delivery Date
              </label>
              <Input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">
                Project
              </label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="PRJ001">Urban Heights Tower</option>
                <option value="PRJ002">Green Valley Residences</option>
                <option value="PRJ003">Eco Apartments Phase 2</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">
                Additional Notes
              </label>
              <textarea
                className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Any specific requirements or questions"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setQuoteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRequestQuote}>
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Marketplace;
