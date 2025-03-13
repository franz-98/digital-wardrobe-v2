
import { toast } from "@/components/ui/use-toast";
import { ItemInference, RecentUpload, ClothingItem } from "../types";

/**
 * Handlers related to confirming inferences
 */
export const createInferenceConfirmationHandlers = (
  setClothingItems: React.Dispatch<React.SetStateAction<ClothingItem[]>>,
  setRecentUploadItems: React.Dispatch<React.SetStateAction<RecentUpload[]>>,
  setLastAddedItem: React.Dispatch<React.SetStateAction<string | null>>
) => {
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

  return {
    confirmMultipleInference,
    confirmSingleInference
  };
};
