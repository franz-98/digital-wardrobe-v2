
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Plus, Grip, Shirt, BarChart, Search, ChevronLeft, ChevronRight } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import ClothingItemDetails from "@/components/ClothingItemDetails";
import { ClothingItem, Outfit } from "@/components/wardrobe/types";
import ClothingTab from "@/components/wardrobe/ClothingTab";
import OutfitTab from "@/components/wardrobe/OutfitTab";
import StatsTab from "@/components/wardrobe/StatsTab";
import OutfitCreation from "@/components/wardrobe/OutfitCreation";
import SearchBar from "@/components/wardrobe/SearchBar";
import OutfitDetails from "@/components/wardrobe/OutfitDetails";

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
      imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop",
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
      imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop",
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
      imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop",
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
      imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
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
      imageUrl: "https://images.unsplash.com/photo-1520903470926-dca555cd44f4?w=400&h=400&fit=crop",
      metadata: {
        dateTaken: "2023-04-05",
        brand: "Gucci",
        material: "Wool",
        season: "Winter",
      },
    },
    {
      id: "6",
      name: "Brown Jacket",
      category: "Outerwear",
      color: "Brown",
      imageUrl: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=400&fit=crop",
      metadata: {
        dateTaken: "2023-04-10",
        brand: "The North Face",
        material: "Leather",
        season: "Fall",
      },
    },
    {
      id: "7",
      name: "Yellow Hat",
      category: "Accessories",
      color: "Yellow",
      imageUrl: "https://images.unsplash.com/photo-1533055640609-24b498dfd74c?w=400&h=400&fit=crop",
      metadata: {
        dateTaken: "2023-04-15",
        brand: "Urban Outfitters",
        material: "Cotton",
        season: "Summer",
      },
    },
  ]);
  
  const [outfits, setOutfits] = useState<Outfit[]>([
    {
      id: "o1",
      name: "Casual Look",
      items: [
        clothingItems.find(item => item.id === "1") || clothingItems[0],
        clothingItems.find(item => item.id === "2") || clothingItems[1]
      ],
      imageUrl: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=400&fit=crop",
    },
    {
      id: "o2",
      name: "Summer Dress",
      items: [
        clothingItems.find(item => item.id === "3") || clothingItems[2],
        clothingItems.find(item => item.id === "4") || clothingItems[3]
      ],
      imageUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=400&fit=crop",
    },
    {
      id: "o3",
      name: "Winter Style",
      items: [
        clothingItems.find(item => item.id === "5") || clothingItems[4],
        clothingItems.find(item => item.id === "6") || clothingItems[5]
      ],
      imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop",
    }
  ]);

  const [suggestedOutfits, setSuggestedOutfits] = useState<Outfit[]>([
    {
      id: "so1",
      name: "Spring Look",
      items: [
        clothingItems.find(item => item.id === "1") || clothingItems[0],
        clothingItems.find(item => item.id === "4") || clothingItems[3],
        clothingItems.find(item => item.id === "5") || clothingItems[4]
      ],
      imageUrl: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=400&h=400&fit=crop",
    },
    {
      id: "so2",
      name: "Party Outfit",
      items: [
        clothingItems.find(item => item.id === "3") || clothingItems[2],
        clothingItems.find(item => item.id === "4") || clothingItems[3]
      ],
      imageUrl: "https://images.unsplash.com/photo-1568252542512-9fe8fe6a8d75?w=400&h=400&fit=crop",
    },
    {
      id: "so3",
      name: "Autumn Style",
      items: [
        clothingItems.find(item => item.id === "6") || clothingItems[5],
        clothingItems.find(item => item.id === "2") || clothingItems[1],
        clothingItems.find(item => item.id === "7") || clothingItems[6]
      ],
      imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop",
    }
  ]);
  
  const [isPremium, setIsPremium] = useState(false);
  const [selectedItemsForOutfit, setSelectedItemsForOutfit] = useState<ClothingItem[]>([]);
  const [isCreatingOutfit, setIsCreatingOutfit] = useState(false);
  const [newOutfitName, setNewOutfitName] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeWardrobeTab") || "clothing";
  });
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const [timeRange, setTimeRange] = useState("month");
  const [showSearchBar, setShowSearchBar] = useState(false);
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [isOutfitDetailsOpen, setIsOutfitDetailsOpen] = useState(false);

  const minSwipeDistance = 50;

  useEffect(() => {
    localStorage.setItem("activeWardrobeTab", activeTab);
  }, [activeTab]);

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
    setSelectedOutfit(null);
    setIsDetailsOpen(true);
    setIsOutfitDetailsOpen(false);
  };

  const findRelatedOutfits = (itemId: string) => {
    return outfits.filter((outfit) =>
      outfit.items.some((item) => item.id === itemId)
    );
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    if (!showSearchBar) {
      setTimeout(() => {
        const searchInput = document.getElementById('search');
        if (searchInput) searchInput.focus();
      }, 100);
    } else {
      setSearchTerm("");
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    setTouchEnd(e.targetTouches[0].clientX);
    
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const bottomReached = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 5;
    
    if (bottomReached) {
      e.preventDefault();
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    const tabValues = ["clothing", "outfits", "stats"];
    const currentIndex = tabValues.indexOf(activeTab);
    
    if (isLeftSwipe && currentIndex < tabValues.length - 1) {
      setActiveTab(tabValues[currentIndex + 1]);
    }
    
    if (isRightSwipe && currentIndex > 0) {
      setActiveTab(tabValues[currentIndex - 1]);
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const togglePremium = () => {
    setIsPremium(!isPremium);
    toast({
      title: isPremium ? "Premium disabled" : "Premium enabled",
      description: isPremium 
        ? "You no longer have access to premium features" 
        : "You now have access to all premium features",
    });
  };

  const toggleItemSelection = (item: ClothingItem) => {
    if (selectedItemsForOutfit.some(i => i.id === item.id)) {
      setSelectedItemsForOutfit(selectedItemsForOutfit.filter(i => i.id !== item.id));
    } else {
      setSelectedItemsForOutfit([...selectedItemsForOutfit, item]);
    }
  };

  const createNewOutfit = () => {
    if (selectedItemsForOutfit.length > 0 && newOutfitName.trim()) {
      const newOutfit: Outfit = {
        id: `o${outfits.length + 1}`,
        name: newOutfitName,
        items: selectedItemsForOutfit,
        imageUrl: selectedItemsForOutfit[0].imageUrl,
      };
      
      setOutfits([...outfits, newOutfit]);
      setNewOutfitName("");
      setSelectedItemsForOutfit([]);
      setIsCreatingOutfit(false);
      
      toast({
        title: "Outfit created!",
        description: `"${newOutfitName}" has been added to your outfits.`,
      });
    }
  };

  const updateStatsForTimeRange = (range: string) => {
    console.log(`Updating stats for time range: ${range}`);
    toast({
      title: "Time range updated",
      description: `Stats now showing for ${range === "week" ? "the last week" : "the last month"}`,
    });
  };

  const updateStatsForCustomRange = (start: Date, end: Date) => {
    console.log(`Updating stats for custom range: ${start.toISOString()} to ${end.toISOString()}`);
  };

  const handleOutfitClick = (outfit: Outfit) => {
    setSelectedOutfit(outfit);
    setSelectedItem(null);
    setIsOutfitDetailsOpen(true);
    setIsDetailsOpen(false);
  };
  
  // Add delete item handler
  const handleDeleteItem = (itemId: string) => {
    // Filter out the item with the specified ID
    const updatedItems = clothingItems.filter(item => item.id !== itemId);
    setClothingItems(updatedItems);
    
    // Also update outfits that contain this item
    const updatedOutfits = outfits.map(outfit => {
      if (outfit.items.some(item => item.id === itemId)) {
        return {
          ...outfit,
          items: outfit.items.filter(item => item.id !== itemId)
        };
      }
      return outfit;
    });
    setOutfits(updatedOutfits);
    
    // Show a success toast
    toast({
      title: "Item deleted",
      description: "The clothing item has been removed from your wardrobe.",
    });
  };

  return (
    <div 
      className="space-y-6 pb-20"
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
        <div className="mt-4 flex items-center justify-between">
          <SearchBar
            showSearchBar={showSearchBar}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            toggleSearchBar={toggleSearchBar}
            activeTab={activeTab}
          />
          
          {activeTab === "stats" && (
            <div className="flex items-center justify-end">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => {
                    const newRange = timeRange === "week" ? "month" : "week";
                    setTimeRange(newRange);
                    updateStatsForTimeRange(newRange);
                  }}
                >
                  {timeRange === "week" ? (
                    <ChevronRight className="h-5 w-5" />
                  ) : (
                    <ChevronLeft className="h-5 w-5" />
                  )}
                </Button>
                <span className="text-sm font-medium">
                  {timeRange === "week" ? "Last Week" : 
                   timeRange === "month" ? "Last Month" : timeRange}
                </span>
              </div>
            </div>
          )}
        </div>
        <TabsContent value="clothing" className="mt-4">
          <OutfitCreation 
            isCreatingOutfit={isCreatingOutfit}
            selectedItemsForOutfit={selectedItemsForOutfit}
            newOutfitName={newOutfitName}
            setNewOutfitName={setNewOutfitName}
            setSelectedItemsForOutfit={setSelectedItemsForOutfit}
            setIsCreatingOutfit={setIsCreatingOutfit}
            createNewOutfit={createNewOutfit}
          />
          
          <ClothingTab 
            clothingItems={clothingItems}
            searchTerm={searchTerm}
            isCreatingOutfit={isCreatingOutfit}
            selectedItemsForOutfit={selectedItemsForOutfit}
            toggleItemSelection={toggleItemSelection}
            handleItemClick={handleItemClick}
            handleDeleteItem={handleDeleteItem}
          />
        </TabsContent>
        <TabsContent value="outfits" className="mt-4">
          <OutfitTab
            outfits={outfits}
            suggestedOutfits={suggestedOutfits}
            searchTerm={searchTerm}
            isPremium={isPremium}
            isCreatingOutfit={isCreatingOutfit}
            selectedItemsForOutfit={selectedItemsForOutfit}
            newOutfitName={newOutfitName}
            setNewOutfitName={setNewOutfitName}
            setIsCreatingOutfit={setIsCreatingOutfit}
            setActiveTab={setActiveTab}
            createNewOutfit={createNewOutfit}
            handleOutfitClick={handleOutfitClick}
            togglePremium={togglePremium}
          />
        </TabsContent>
        <TabsContent value="stats" className="mt-4">
          <StatsTab 
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            updateStatsForTimeRange={updateStatsForTimeRange}
            updateStatsForCustomRange={updateStatsForCustomRange}
          />
        </TabsContent>
      </Tabs>
      
      {selectedItem && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-md">
            <ClothingItemDetails
              item={selectedItem}
              open={isDetailsOpen}
              onOpenChange={setIsDetailsOpen}
              relatedOutfits={findRelatedOutfits(selectedItem.id)}
            />
          </DialogContent>
        </Dialog>
      )}
      
      {selectedOutfit && (
        <Dialog open={isOutfitDetailsOpen} onOpenChange={setIsOutfitDetailsOpen}>
          <DialogContent className="max-w-md">
            <OutfitDetails outfit={selectedOutfit} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default WardrobePage;
