
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Plus, Grip, Shirt, BarChart } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import ClothingItemCard from "@/components/ClothingItemCard";
import ClothingItemDetails from "@/components/ClothingItemDetails";
import OutfitCard from "@/components/OutfitCard";

interface ClothingItem {
  id: string;
  name: string;
  category: string;
  color: string;
  imageUrl: string;
  metadata?: {
    dateTaken?: string;
    brand?: string;
    material?: string;
    season?: string;
  };
}

interface Outfit {
  id: string;
  name: string;
  items: ClothingItem[];
  imageUrl?: string;
}

const WardrobePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([
    {
      id: "1",
      name: "Blue T-shirt",
      category: "Tops",
      color: "Blue",
      imageUrl: "/images/clothing-items/blue-t-shirt.png",
      metadata: {
        dateTaken: "2023-03-15",
        brand: "Nike",
        material: "Cotton",
        season: "Spring",
      },
    },
    {
      id: "2",
      name: "Black Jeans",
      category: "Bottoms",
      color: "Black",
      imageUrl: "/images/clothing-items/black-jeans.png",
      metadata: {
        dateTaken: "2023-03-20",
        brand: "Levi's",
        material: "Denim",
        season: "Fall",
      },
    },
    {
      id: "3",
      name: "Red Dress",
      category: "Dresses",
      color: "Red",
      imageUrl: "/images/clothing-items/red-dress.png",
      metadata: {
        dateTaken: "2023-03-25",
        brand: "Zara",
        material: "Silk",
        season: "Summer",
      },
    },
    {
      id: "4",
      name: "White Sneakers",
      category: "Shoes",
      color: "White",
      imageUrl: "/images/clothing-items/white-sneakers.png",
      metadata: {
        dateTaken: "2023-03-30",
        brand: "Adidas",
        material: "Leather",
        season: "All",
      },
    },
    {
      id: "5",
      name: "Green Scarf",
      category: "Accessories",
      color: "Green",
      imageUrl: "/images/clothing-items/green-scarf.png",
      metadata: {
        dateTaken: "2023-04-05",
        brand: "Gucci",
        material: "Wool",
        season: "Winter",
      },
    },
  ]);
  const [outfits, setOutfits] = useState<Outfit[]>([
    {
      id: "o1",
      name: "Casual Look",
      items: [clothingItems[0], clothingItems[1]],
      imageUrl: "/images/outfits/casual-look.png",
    },
    {
      id: "o2",
      name: "Summer Dress",
      items: [clothingItems[2], clothingItems[3]],
      imageUrl: "/images/outfits/summer-dress.png",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("clothing");
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("30days");
  
  // Touch start position for swipe functionality
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("newItem") === "true") {
      toast({
        title: "New item added!",
        description: "Your new clothing item has been successfully added.",
      });
      navigate("/wardrobe", { replace: true });
    }
  }, [location, toast, navigate]);

  const handleItemClick = (item: ClothingItem) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };

  const filteredClothingItems = clothingItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOutfits = outfits.filter((outfit) =>
    outfit.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const findRelatedOutfits = (itemId: string) => {
    return outfits.filter((outfit) =>
      outfit.items.some((item) => item.id === itemId)
    );
  };

  // Handle swipe on touch devices
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    // Determine tab index to navigate to
    const tabValues = ["clothing", "outfits", "stats"];
    const currentIndex = tabValues.indexOf(activeTab);
    
    if (isLeftSwipe && currentIndex < tabValues.length - 1) {
      // Navigate to next tab
      setActiveTab(tabValues[currentIndex + 1]);
    }
    
    if (isRightSwipe && currentIndex > 0) {
      // Navigate to previous tab
      setActiveTab(tabValues[currentIndex - 1]);
    }
    
    // Reset
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div 
      className="space-y-8 pb-10"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Wardrobe</h1>
        <Button onClick={() => navigate("/add-item")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>

      <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="clothing" className="flex-1">
            <Grip className="mr-2 h-4 w-4" />
            Clothing
          </TabsTrigger>
          <TabsTrigger value="outfits" className="flex-1">
            <Shirt className="mr-2 h-4 w-4" />
            Outfits
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex-1">
            <BarChart className="mr-2 h-4 w-4" />
            Stats
          </TabsTrigger>
        </TabsList>
        <div className="mt-4 flex items-center space-x-2">
          <Label htmlFor="search">Search:</Label>
          <Input
            type="search"
            id="search"
            placeholder={`Search ${activeTab}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <TabsContent value="clothing" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredClothingItems.map((item) => (
              <ClothingItemCard
                key={item.id}
                item={item}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="outfits" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredOutfits.map((outfit) => (
              <OutfitCard key={outfit.id} outfit={outfit} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="stats" className="mt-6">
          <div className="mb-6">
            <Label className="mb-2 block">Time Range:</Label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 3 months</SelectItem>
                <SelectItem value="6months">Last 6 months</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Wardrobe Composition</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Tops</span>
                  <span className="font-medium">40%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '40%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Bottoms</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '20%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Dresses</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '20%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Shoes</span>
                  <span className="font-medium">10%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '10%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Accessories</span>
                  <span className="font-medium">10%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Most Worn Items</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded bg-primary/20 mr-2"></div>
                    <span>Blue T-shirt</span>
                  </div>
                  <span className="font-medium">12 times</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded bg-primary/20 mr-2"></div>
                    <span>Black Jeans</span>
                  </div>
                  <span className="font-medium">8 times</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded bg-primary/20 mr-2"></div>
                    <span>White Sneakers</span>
                  </div>
                  <span className="font-medium">6 times</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded bg-primary/20 mr-2"></div>
                    <span>Red Dress</span>
                  </div>
                  <span className="font-medium">4 times</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {selectedItem && (
        <ClothingItemDetails
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          item={selectedItem}
          relatedOutfits={findRelatedOutfits(selectedItem.id)}
        />
      )}
    </div>
  );
};

export default WardrobePage;
