import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ItemInference, RecentUpload } from "@/components/home/types";
import { useNavigate } from "react-router-dom";
import { useWardrobeState } from "@/hooks/useWardrobeState";

export const useItemInference = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemInference | null>(null);
  const [inferenceDialogOpen, setInferenceDialogOpen] = useState(false);
  
  const { setClothingItems, clothingItems } = useWardrobeState();
  
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

  const [recentUploadItems, setRecentUploadItems] = useState<RecentUpload[]>([
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
  ]);

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
    
    const newClothingItem = {
      id: `clothing-${Date.now()}`,
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
    
    setClothingItems([newClothingItem, ...clothingItems]);
    
    if (selectedItem.id.startsWith("1") || selectedItem.id.startsWith("2") || selectedItem.id.startsWith("3")) {
      setRecentUploadItems(prevItems => 
        prevItems.filter(item => item.id !== selectedItem.id)
      );
    }
    
    toast({
      title: "Item confermato",
      description: `"${selectedItem.name}" è stato aggiunto al tuo guardaroba.`,
    });
    
    handleDialogOpenChange(false);
    
    setTimeout(() => navigate("/wardrobe"), 500);
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
