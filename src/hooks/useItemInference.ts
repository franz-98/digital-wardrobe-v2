
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWardrobeData } from "@/hooks/useWardrobeData";
import { ItemInference } from "@/components/home/types";

// Import the refactored modules
import { DEFAULT_INFERRED_ITEMS } from "./item-inference/types";
import { loadRecentUploads, saveRecentUploads } from "./item-inference/storage-utils";
import { createInferenceHandlers } from "./item-inference/inference-handlers";

export const useItemInference = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  
  // State for single item inference
  const [selectedItem, setSelectedItem] = useState<ItemInference | null>(null);
  const [inferenceDialogOpen, setInferenceDialogOpen] = useState(false);
  
  // State for multiple items inference
  const [inferredItems, setInferredItems] = useState<ItemInference[]>([]);
  const [multipleInferenceDialogOpen, setMultipleInferenceDialogOpen] = useState(false);
  
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

  // Load and manage recent uploads
  const [recentUploadItems, setRecentUploadItems] = useState(loadRecentUploads);

  // Save recent uploads to localStorage whenever they change
  useEffect(() => {
    saveRecentUploads(recentUploadItems);
  }, [recentUploadItems]);

  // Create handlers with the current state setters
  const handlers = createInferenceHandlers(
    setSelectedItem,
    setInferenceDialogOpen,
    setMultipleInferenceDialogOpen,
    setInferredItems,
    setIsUploading,
    setRecentUploadItems,
    setClothingItems,
    setLastAddedItem
  );

  // Wrap handlers to use the current state
  const confirmSingleInference = () => {
    handlers.confirmSingleInference(selectedItem);
    handlers.handleSingleDialogOpenChange(false, setInferenceDialogOpen, setSelectedItem);
  };

  const confirmMultipleInference = (items: ItemInference[]) => {
    handlers.confirmMultipleInference(items);
  };

  const handleSingleInferenceEdit = (field: keyof ItemInference, value: string) => {
    const updatedItem = handlers.handleInferenceEdit(selectedItem, field, value);
    if (updatedItem) {
      setSelectedItem(updatedItem);
    }
  };

  const handleMultipleInferenceEdit = (itemIndex: number, field: keyof ItemInference, value: string) => {
    const updatedItems = handlers.handleMultipleInferenceEdit(inferredItems, itemIndex, field, value);
    setInferredItems(updatedItems);
  };

  const handleSingleDialogOpenChange = (open: boolean) => {
    handlers.handleSingleDialogOpenChange(open, setInferenceDialogOpen, setSelectedItem);
  };

  const handleMultipleDialogOpenChange = (open: boolean) => {
    handlers.handleMultipleDialogOpenChange(open, setMultipleInferenceDialogOpen, setInferredItems);
  };

  return {
    isUploading,
    // Single item inference
    selectedItem,
    inferenceDialogOpen,
    // Multiple items inference
    inferredItems,
    multipleInferenceDialogOpen,
    // Recent uploads
    recentUploadItems,
    // Handlers
    handleFileChange: handlers.handleFileChange,
    handleRecentItemClick: handlers.handleRecentItemClick,
    confirmSingleInference,
    confirmMultipleInference,
    handleSingleInferenceEdit,
    handleMultipleInferenceEdit,
    handleSingleDialogOpenChange,
    handleMultipleDialogOpenChange,
  };
};
