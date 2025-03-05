
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { ItemInference, RecentUpload } from "@/components/home/types";
import { useNavigate } from "react-router-dom";
import { useWardrobeData } from "@/hooks/useWardrobeData";
import { ClothingItem } from "@/components/wardrobe/types";

export const useItemInference = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemInference | null>(null);
  const [inferenceDialogOpen, setInferenceDialogOpen] = useState(false);
  
  const { setClothingItems, clothingItems } = useWardrobeData();
  
  // Track if we've just added an item to help with debugging
  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null);
  
  // Log whenever clothingItems changes to help debug
  useEffect(() => {
    if (lastAddedItem) {
      console.log("Clothing items updated after adding:", lastAddedItem);
      console.log("Current clothing items count:", clothingItems.length);
      console.log("First few items:", clothingItems.slice(0, 3).map(item => item.id));
      setLastAddedItem(null);
    }
  }, [clothingItems, lastAddedItem]);

  // Store recent uploads in localStorage to persist across page navigations
  const [inferredItems, setInferredItems] = useState<ItemInference[]>([
    {
      id: "inferred-1",
      name: "Blue T-Shirt",
      category: "Tops",
      color: "Blue",
      imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3",
      confidence: 0.92
    },
    {
      id: "inferred-2",
      name: "Black Jeans",
      category: "Bottoms",
      color: "Black",
      imageUrl: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3",
      confidence: 0.88
    }
  ]);

  // Load recent uploads from localStorage on initial load
  const loadRecentUploads = (): RecentUpload[] => {
    try {
      const savedItems = localStorage.getItem('recentUploadItems');
      if (savedItems) {
        return JSON.parse(savedItems);
      }
    } catch (e) {
      console.error("Failed to load recent uploads from localStorage:", e);
    }
    
    // Default items if nothing in localStorage
    return [
      {
        id: "1",
        name: "Blue T-Shirt",
        imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3",
        category: "Tops",
        createdAt: "2023-11-01T00:00:00Z",
      },
      {
        id: "2",
        name: "Black Jeans",
        imageUrl: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3",
        category: "Bottoms",
        createdAt: "2023-11-02T00:00:00Z",
      },
      {
        id: "3",
        name: "White Sneakers",
        imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3",
        category: "Footwear",
        createdAt: "2023-11-03T00:00:00Z",
      },
    ];
  };

  const [recentUploadItems, setRecentUploadItems] = useState<RecentUpload[]>(loadRecentUploads);

  // Save recent uploads to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('recentUploadItems', JSON.stringify(recentUploadItems));
      console.log("Saved recent uploads to localStorage:", recentUploadItems.length, "items");
    } catch (e) {
      console.error("Failed to save recent uploads to localStorage:", e);
    }
  }, [recentUploadItems]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    const formData = new FormData();
    formData.append("image", file);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const inferredItem = {
        id: `inferred-${Date.now()}`,
        name: "", // Empty initial name
        category: "Tops", // Default category
        color: "",
        imageUrl: URL.createObjectURL(file),
        confidence: 0.85
      };
      
      setSelectedItem(inferredItem);
      setInferenceDialogOpen(true);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = "";
    }
  };

  const handleRecentItemClick = (item: RecentUpload) => {
    const inferredItem: ItemInference = {
      id: item.id,
      name: item.name, // Use the existing name from the recent upload item
      category: item.category,
      color: "",
      imageUrl: item.imageUrl,
      confidence: 1.0
    };
    
    setSelectedItem(inferredItem);
    setInferenceDialogOpen(true);

    setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }, 50);
  };
  
  const confirmInference = () => {
    if (!selectedItem) return;
    
    // Generate a truly unique ID with timestamp and random string
    const uniqueId = `clothing-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    
    // Create a new clothing item with unique ID
    const newClothingItem: ClothingItem = {
      id: uniqueId,
      name: selectedItem.name,
      category: selectedItem.category,
      color: selectedItem.color || "Unknown", // Default if color is not provided
      imageUrl: selectedItem.imageUrl,
      metadata: {
        dateTaken: new Date().toISOString().split('T')[0],
        material: "",
        brand: "",
        season: ""
      }
    };
    
    // Store ID of the item we're adding for debugging
    setLastAddedItem(uniqueId);
    
    // Add the item to the wardrobe - ensure it's prepended to the array
    // Using functional update to ensure we have the latest state
    setClothingItems(prevItems => {
      console.log("Adding new item to wardrobe:", uniqueId);
      console.log("Previous items count:", prevItems.length);
      return [newClothingItem, ...prevItems];
    });
    
    // If the selected item is from recent uploads, remove it from the list
    const isFromRecentUploads = recentUploadItems.some(item => item.id === selectedItem.id);
    
    if (isFromRecentUploads) {
      setRecentUploadItems(prevItems => {
        const filteredItems = prevItems.filter(item => item.id !== selectedItem.id);
        console.log(`Removed item ${selectedItem.id} from recent uploads`);
        return filteredItems;
      });
      
      console.log(`Added item ${newClothingItem.id} to wardrobe`);
    }
    
    // Show success toast
    toast({
      title: "Item confermato",
      description: `"${selectedItem.name}" è stato aggiunto al tuo guardaroba.`,
      duration: 1500,
      className: "compact-toast top-toast",
    });
    
    // Close the dialog but don't navigate away from the home page
    handleDialogOpenChange(false);
  };

  const handleInferenceEdit = (field: keyof ItemInference, value: string) => {
    if (!selectedItem) return;
    
    setSelectedItem(prev => 
      prev ? { ...prev, [field]: value } : null
    );
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setInferenceDialogOpen(false);
      setTimeout(() => setSelectedItem(null), 300);
    } else {
      setInferenceDialogOpen(true);
    }
  };

  return {
    isUploading,
    selectedItem,
    inferenceDialogOpen,
    inferredItems,
    recentUploadItems,
    handleFileChange,
    handleRecentItemClick,
    confirmInference,
    handleInferenceEdit,
    handleDialogOpenChange,
  };
};
