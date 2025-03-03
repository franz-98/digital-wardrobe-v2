<lov-code>
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Plus, Grip, Shirt, BarChart, Search, Clock, ChevronLeft, ChevronRight, ChevronDown, CheckCircle2, Lock as LockIcon, X, Calendar } from "lucide-react";
import { format, isAfter, isBefore } from "date-fns";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
  const timeRangeMenuRef = useRef<HTMLDivElement>(null);
  const timeRangeButtonRef = useRef<HTMLButtonElement>(null);

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
  const [showTimeRangeMenu, setShowTimeRangeMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [showCustomRange, setShowCustomRange] = useState(false);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        timeRangeMenuRef.current && 
        !timeRangeMenuRef.current.contains(event.target as Node) &&
        timeRangeButtonRef.current &&
        !timeRangeButtonRef.current.contains(event.target as Node)
      ) {
        setShowTimeRangeMenu(false);
      }
    };
    
    const handleScroll = () => {
      if (showTimeRangeMenu) {
        setShowTimeRangeMenu(false);
      }
      if (showCustomRange) {
        setShowCustomRange(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleScroll);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
    };
  }, [showTimeRangeMenu, showCustomRange]);

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

  const toggleTimeRangeMenu = () => {
    setShowTimeRangeMenu(!showTimeRangeMenu);
    if (showCustomRange) {
      setShowCustomRange(false);
    }
  };

  const selectTimeRange = (range: string) => {
    if (range === "custom") {
      setShowCustomRange(true);
    } else {
      setTimeRange(range);
      setShowTimeRangeMenu(false);
      
      updateStatsForTimeRange(range);
    }
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date);
    
    setTimeout(() => {
      const popoverElements = document.querySelectorAll('[data-state="open"][data-radix-popper-content-wrapper]');
      popoverElements.forEach(element => {
        const closeButton = element.querySelector('button[type="button"]');
        if (closeButton && closeButton instanceof HTMLButtonElement) {
          closeButton.click();
        }
      });
    }, 10);
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    setEndDate(date);
    
    setTimeout(() => {
      const popoverElements = document.querySelectorAll('[data-state="open"][data-radix-popper-content-wrapper]');
      popoverElements.forEach(element => {
        const closeButton = element.querySelector('button[type="button"]');
        if (closeButton && closeButton instanceof HTMLButtonElement) {
          closeButton.click();
        }
      });
    }, 10);
  };

  const confirmCustomRange = () => {
    if (startDate && endDate) {
      if (isBefore(endDate, startDate)) {
        toast({
          title: "Invalid date range",
          description: "End date cannot be before start date",
        });
        return;
      }
      
      setTimeRange(`${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d')}`);
      setShowCustomRange(false);
      setShowTimeRangeMenu(false);
      
      updateStatsForCustomRange(startDate, endDate);
      
      toast({
        title: "Custom range applied",
        description: `Date range set to ${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d')}`,
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
    console.log(`Updating stats for custom range: ${format(start, 'yyyy-MM-dd')} to ${format(end, 'yyyy-MM-dd')}`);
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
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleSearchBar}>
              <Search className="h-5 w-5" />
            </Button>
            {showSearchBar && (
              <Input
                type="search"
                id="search"
                placeholder={`Search ${activeTab}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full ml-2 animate-fade-in"
              />
            )}
          </div>
          
          {activeTab === "stats" && (
            <div className="flex items-center gap-2">
              <div className="relative">
                {showTimeRangeMenu && !showCustomRange && (
                  <div 
                    ref={timeRangeMenuRef}
                    className="absolute top-full right-0 mt-2 z-10 bg-background/90 backdrop-blur-lg rounded-xl shadow-lg border border-border/50 py-1 text-sm w-40 overflow-hidden animate-fade-in"
                  >
                    <button 
                      className={`w-full text-left px-4 py-2.5 hover:bg-primary/10 text-foreground transition-colors ${timeRange === "week" ? "font-medium text-primary" : ""}`}
                      onClick={() => selectTimeRange("week")}
                    >
                      Last week
                    </button>
                    <button 
                      className={`w-full text-left px-4 py-2.5 hover:bg-primary/10 text-foreground transition-colors ${timeRange === "month" ? "font-medium text-primary" : ""}`}
                      onClick={() => selectTimeRange("month")}
                    >
                      Last month
                    </button>
                    <button 
                      className={`w-full text-left px-4 py-2.5 hover:bg-primary/10 text-foreground transition-colors ${timeRange !== "week" && timeRange !== "month" ? "font-medium text-primary" : ""}`}
                      onClick={() => selectTimeRange("custom")}
                    >
                      Custom range...
                    </button>
                  </div>
                )}
                
                {showCustomRange && (
                  <div
                    ref={timeRangeMenuRef}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10 bg-background/95 backdrop-blur-lg rounded-xl shadow-lg border border-border/50 p-3 text-sm w-72 animate-fade-in"
                    style={{ maxWidth: "calc(100vw - 2rem)" }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Select date range</h3>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setShowCustomRange(false)}
                        className="h-7 w-7"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex flex-col gap-2 mb-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-left font-normal"
                            size="sm"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, 'PPP') : "Start date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="center">
                          <CalendarComponent
                            mode="single"
                            selected={startDate}
                            onSelect={handleStartDateSelect}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-left font-normal"
                            size="sm"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, 'PPP') : "End date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="center">
                          <CalendarComponent
                            mode="single"
                            selected={endDate}
                            onSelect={handleEndDateSelect}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <Button 
                      className="w-full"
                      size="sm"
                      onClick={confirmCustomRange}
                      disabled={!startDate || !endDate}
                    >
                      Apply range
                    </Button>
                  </div>
                )}
              </div>
              
              <Button 
                ref={timeRangeButtonRef}
                variant="outline" 
                size="sm" 
                className="h-8 px-3 text-xs font-medium rounded-full bg-background border border-border/50 shadow-sm flex items-center"
                onClick={toggleTimeRangeMenu}
              >
                <Clock className="h-3.5 w-3.5 mr-1.5 opacity-70" />
                {timeRange === "week" ? "Last week" : timeRange === "month" ? "Last month" : timeRange}
                <ChevronDown className="h-3.5 w-3.5 ml-1.5 opacity-70" />
              </Button>
            </div>
          )}
        </div>
        <TabsContent value="clothing" className="mt-4">
          {isCreatingOutfit && (
            <div className="mb-4 p-3 bg-muted/40 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Create new outfit</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setIsCreatingOutfit(false);
                    setSelectedItemsForOutfit([]);
                  }}
                >
                  Cancel
                </Button>
              </div>
              <div>
                <Input
                  placeholder="Outfit name"
                  value={newOutfitName}
                  onChange={(e) => setNewOutfitName(e.target.value)}
                  className="text-sm mb-2"
                />
                <Button 
                  onClick={createNewOutfit}
                  disabled={!newOutfitName.trim() || selectedItemsForOutfit.length === 0}
                >
                  Save Outfit
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 mb-2">
                Select items for your outfit ({selectedItemsForOutfit.length} selected)
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {filteredClothingItems.map((item) => (
              <div key={item.id} className="relative">
                {isCreatingOutfit && (
                  <button 
                    className="absolute top-1 left-1 z-10 rounded-full bg-white/90 p-0.5 shadow-sm"
                    onClick={() => toggleItemSelection(item)}
                  >
                    {selectedItemsForOutfit.some(i => i.id === item.id) ? (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2" />
                    )}
                  </button>
                )}
                <ClothingItemCard
                  item={item}
                  onClick={() => isCreatingOutfit ? toggleItemSelection(item) : handleItemClick(item)}
                />
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="outfits" className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">My Outfits</h3>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setIsCreatingOutfit(!isCreatingOutfit);
                  setActiveTab("clothing");
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Outfit
              </Button>
            </div>
          </div>
          
          {isCreatingOutfit && selectedItemsForOutfit.length > 0 && (
            <div className="mb-4 p-3 bg-muted/40 rounded-lg">
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Outfit name"
                  value={newOutfitName}
                  onChange={(e) => setNewOutfitName(e.target.value)}
                  className="text-sm"
                />
                <Button 
                  onClick={createNewOutfit}
                  disabled={!newOutfitName.trim() || selectedItemsForOutfit.length === 0}
                >
                  Save
                </Button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {selectedItemsForOutfit.map((item) => (
                  <div key={item.id} className="h-16 w-16 rounded overflow-hidden flex-shrink-0 relative">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    <button 
                      className="absolute top-0.5 right-0.5 bg-black/60 rounded-full p-0.5"
                      onClick={() => setSelectedItemsForOutfit(selectedItemsForOutfit.filter(i => i.id !== item.id))}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {filteredOutfits.map((outfit) => (
              <OutfitCard key={outfit.id} outfit={outfit} />
            ))}
          </div>
          
          {isPremium && (
            <>
              <div className="flex items-center justify-between mt-8 mb-4">
                <h3 className="font-medium">Suggested Outfits</h3>
                <Badge variant="outline" className="text-xs py-0 h-5">
                  <span className="text-primary mr-1">Premium</span>
                </Badge>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {suggestedOutfits.map((outfit) => (
                  <OutfitCard key={outfit.id} outfit={outfit} />
                ))}
              </div>
            </>
          )}
          
          {!isPremium && (
            <div className="mt-8 p-4 border rounded-lg bg-muted/20 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-2">
                <LockIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">Unlock Suggested Outfits</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Get personalized outfit suggestions based on your style and wardrobe.
              </p>
              <Button size="sm" onClick={togglePremium}>
                Upgrade to Premium
              </Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="stats" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="text-base font-medium mb-4">Wardrobe Composition</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tops</span>
                  <span className="font-medium text-sm">40%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '40%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Bottoms</span>
                  <span className="font-medium text-sm">20%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '20%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Dresses</span>
                  <span className="font-medium text-sm">20%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '20%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Shoes</span>
                  <span className="font-medium text-sm">10%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '10%' }}></div>
                </div>
                
                <div
