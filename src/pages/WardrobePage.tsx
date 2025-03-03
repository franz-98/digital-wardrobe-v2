
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs } from "@/components/ui/tabs";

import { useToast } from "@/hooks/use-toast";
import { ClothingItem, Outfit } from "@/components/wardrobe/types";
import SearchBar from "@/components/wardrobe/SearchBar";
import WardrobeHeader from "@/components/wardrobe/WardrobeHeader";
import WardrobeTabsNav from "@/components/wardrobe/WardrobeTabsNav";
import WardrobeTabContent from "@/components/wardrobe/WardrobeTabContent";
import WardrobeDialogs from "@/components/wardrobe/WardrobeDialogs";
import SwipeHandler from "@/components/wardrobe/SwipeHandler";

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
  
  // Define the initial outfits
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [suggestedOutfits, setSuggestedOutfits] = useState<Outfit[]>([]);

  // Initialize outfits after clothingItems are loaded
  useEffect(() => {
    if (clothingItems.length > 0) {
      setOutfits([
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

      setSuggestedOutfits([
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
    }
  }, [clothingItems]);
  
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
  
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [isOutfitDetailsOpen, setIsOutfitDetailsOpen] = useState(false);

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
  
  const handleOutfitItemClick = (itemId: string) => {
    // Find the item by id from the outfit's items
    let itemToShow: ClothingItem | undefined;
    
    if (selectedOutfit) {
      itemToShow = selectedOutfit.items.find(item => item.id === itemId);
    }
    
    if (itemToShow) {
      setSelectedItem(itemToShow);
      setSelectedOutfit(null);
      setIsOutfitDetailsOpen(false);
      setIsDetailsOpen(true);
    }
  };
  
  const handleDeleteItem = (itemId: string) => {
    const updatedItems = clothingItems.filter(item => item.id !== itemId);
    setClothingItems(updatedItems);
    
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
    
    toast({
      title: "Item deleted",
      description: "The clothing item has been removed from your wardrobe.",
    });
  };
  
  const handleDeleteOutfit = (outfitId: string) => {
    const updatedOutfits = outfits.filter(outfit => outfit.id !== outfitId);
    setOutfits(updatedOutfits);
    
    toast({
      title: "Outfit deleted",
      description: "The outfit has been removed from your wardrobe.",
    });
    
    setIsOutfitDetailsOpen(false);
  };

  return (
    <SwipeHandler activeTab={activeTab} setActiveTab={setActiveTab}>
      <WardrobeHeader />

      <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
        <WardrobeTabsNav activeTab={activeTab} />
        
        <div className="mt-4 flex items-center justify-between h-10">
          <SearchBar
            showSearchBar={showSearchBar}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            toggleSearchBar={toggleSearchBar}
            activeTab={activeTab}
          />
        </div>
        
        <WardrobeTabContent
          activeTab={activeTab}
          clothingItems={clothingItems}
          outfits={outfits}
          suggestedOutfits={suggestedOutfits}
          searchTerm={searchTerm}
          isCreatingOutfit={isCreatingOutfit}
          selectedItemsForOutfit={selectedItemsForOutfit}
          newOutfitName={newOutfitName}
          isPremium={isPremium}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          setNewOutfitName={setNewOutfitName}
          setSelectedItemsForOutfit={setSelectedItemsForOutfit}
          setIsCreatingOutfit={setIsCreatingOutfit}
          setActiveTab={setActiveTab}
          createNewOutfit={createNewOutfit}
          toggleItemSelection={toggleItemSelection}
          handleItemClick={handleItemClick}
          handleOutfitClick={handleOutfitClick}
          togglePremium={togglePremium}
          handleDeleteItem={handleDeleteItem}
          updateStatsForTimeRange={updateStatsForTimeRange}
          updateStatsForCustomRange={updateStatsForCustomRange}
        />
      </Tabs>
      
      <WardrobeDialogs
        selectedItem={selectedItem}
        selectedOutfit={selectedOutfit}
        isDetailsOpen={isDetailsOpen}
        isOutfitDetailsOpen={isOutfitDetailsOpen}
        setIsDetailsOpen={setIsDetailsOpen}
        setIsOutfitDetailsOpen={setIsOutfitDetailsOpen}
        findRelatedOutfits={findRelatedOutfits}
        handleDeleteItem={handleDeleteItem}
        handleDeleteOutfit={handleDeleteOutfit}
        handleOutfitItemClick={handleOutfitItemClick}
      />
    </SwipeHandler>
  );
};

export default WardrobePage;
