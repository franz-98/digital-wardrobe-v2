
import { toast } from "@/components/ui/use-toast";
import { ItemInference, RecentUpload, ClothingItem, InferenceResponse } from "./types";

/**
 * Create handlers for item inference operations
 */
export const createInferenceHandlers = (
  setSelectedItem: React.Dispatch<React.SetStateAction<ItemInference | null>>,
  setInferenceDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setMultipleInferenceDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setInferredItems: React.Dispatch<React.SetStateAction<ItemInference[]>>,
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
      // Simulate API call to backend that returns multiple detected items
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const sharedImageUrl = URL.createObjectURL(file);
      
      // Simulate multiple detected items from a single image
      const inferredItems: ItemInference[] = [
        {
          id: `inferred-${Date.now()}-1`,
          name: "T-Shirt", // Empty initial name for first item
          category: "Tops", // Default category
          color: "Blue",
          imageUrl: sharedImageUrl,
          confidence: 0.92
        },
        {
          id: `inferred-${Date.now()}-2`,
          name: "Jeans", // Empty initial name for second item
          category: "Bottoms", // Default category
          color: "Blue",
          imageUrl: sharedImageUrl,
          confidence: 0.85
        }
      ];
      
      // Set the inferred items and open the multiple inference dialog
      setInferredItems(inferredItems);
      setMultipleInferenceDialogOpen(true);
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
  
  // Handle confirmation of multiple inferred items
  const confirmMultipleInference = (items: ItemInference[]) => {
    if (!items.length) return;
    
    const newClothingItems: ClothingItem[] = items.map(item => {
      // Generate a truly unique ID with timestamp and random string
      const uniqueId = `clothing-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
      
      // Create a new clothing item with unique ID
      return {
        id: uniqueId,
        name: item.name,
        category: item.category,
        color: item.color || "Unknown", // Default if color is not provided
        imageUrl: item.imageUrl,
        metadata: {
          dateTaken: new Date().toISOString().split('T')[0],
          material: "",
          brand: "",
          season: ""
        }
      };
    });
    
    // Store ID of the items we're adding for debugging
    if (newClothingItems.length > 0) {
      setLastAddedItem(newClothingItems[0].id);
    }
    
    // Add the items to the wardrobe - ensure it's prepended to the array
    // Using functional update to ensure we have the latest state
    setClothingItems(prevItems => {
      console.log(`Adding ${newClothingItems.length} new items to wardrobe`);
      console.log("Previous items count:", prevItems.length);
      return [...newClothingItems, ...prevItems];
    });
    
    // Show success toast
    toast({
      title: "Articoli confermati",
      description: `${newClothingItems.length} articoli sono stati aggiunti al tuo guardaroba.`,
      duration: 1500,
      className: "compact-toast top-toast",
    });
  };
  
  // Handle confirmation of single inferred item
  const confirmSingleInference = (selectedItem: ItemInference | null) => {
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

  // Handle edit of inferred item in multiple items
  const handleMultipleInferenceEdit = (
    inferredItems: ItemInference[],
    itemIndex: number,
    field: keyof ItemInference,
    value: string
  ) => {
    const updatedItems = [...inferredItems];
    if (updatedItems[itemIndex]) {
      updatedItems[itemIndex] = { 
        ...updatedItems[itemIndex], 
        [field]: value 
      };
    }
    return updatedItems;
  };

  // Handle single dialog open/close
  const handleSingleDialogOpenChange = (
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

  // Handle multiple dialog open/close
  const handleMultipleDialogOpenChange = (
    open: boolean,
    setMultipleInferenceDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setInferredItems: React.Dispatch<React.SetStateAction<ItemInference[]>>
  ) => {
    if (!open) {
      setMultipleInferenceDialogOpen(false);
      setTimeout(() => setInferredItems([]), 300);
    } else {
      setMultipleInferenceDialogOpen(true);
    }
  };

  return {
    handleFileChange,
    handleRecentItemClick,
    confirmSingleInference,
    confirmMultipleInference,
    handleInferenceEdit,
    handleMultipleInferenceEdit,
    handleSingleDialogOpenChange,
    handleMultipleDialogOpenChange,
  };
};
