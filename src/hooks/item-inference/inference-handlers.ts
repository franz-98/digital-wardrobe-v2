
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ItemInference, RecentUpload, ClothingItem } from "./types";

/**
 * Create handlers for item inference operations
 */
export const createInferenceHandlers = (
  setSelectedItem: React.Dispatch<React.SetStateAction<ItemInference | null>>,
  setInferenceDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>,
  setRecentUploadItems: React.Dispatch<React.SetStateAction<RecentUpload[]>>,
  setClothingItems: React.Dispatch<React.SetStateAction<ClothingItem[]>>,
  setLastAddedItem: React.Dispatch<React.SetStateAction<string | null>>
) => {
  // Handle file upload and simulate inference
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

  // Handle click on a recent upload item
  const handleRecentItemClick = (item: RecentUpload) => {
    const inferredItem: ItemInference = {
      id: item.id,
      name: item.name,
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
  
  // Handle confirmation of inferred item
  const confirmInference = (selectedItem: ItemInference | null) => {
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
    setRecentUploadItems(prevItems => {
      const isFromRecentUploads = prevItems.some(item => item.id === selectedItem.id);
      if (isFromRecentUploads) {
        const filteredItems = prevItems.filter(item => item.id !== selectedItem.id);
        console.log(`Removed item ${selectedItem.id} from recent uploads`);
        return filteredItems;
      }
      return prevItems;
    });
    
    console.log(`Added item ${newClothingItem.id} to wardrobe`);
    
    // Show success toast
    toast({
      title: "Item confermato",
      description: `"${selectedItem.name}" è stato aggiunto al tuo guardaroba.`,
      duration: 1500,
      className: "compact-toast top-toast",
    });
  };

  // Handle edit of inferred item fields
  const handleInferenceEdit = (
    selectedItem: ItemInference | null,
    field: keyof ItemInference,
    value: string
  ) => {
    if (!selectedItem) return null;
    
    return { ...selectedItem, [field]: value };
  };

  // Handle dialog open/close
  const handleDialogOpenChange = (
    open: boolean,
    setInferenceDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedItem: React.Dispatch<React.SetStateAction<ItemInference | null>>
  ) => {
    if (!open) {
      setInferenceDialogOpen(false);
      setTimeout(() => setSelectedItem(null), 300);
    } else {
      setInferenceDialogOpen(true);
    }
  };

  return {
    handleFileChange,
    handleRecentItemClick,
    confirmInference,
    handleInferenceEdit,
    handleDialogOpenChange,
  };
};
