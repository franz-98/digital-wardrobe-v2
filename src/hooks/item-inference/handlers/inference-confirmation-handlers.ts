
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
  // Process items based on confidence threshold
  const processItems = (items: ItemInference[]) => {
    const CONFIDENCE_THRESHOLD = 0.75; // 75% confidence threshold
    
    const highConfidenceItems: ItemInference[] = [];
    const lowConfidenceItems: RecentUpload[] = [];
    
    // Split items based on confidence threshold
    items.forEach(item => {
      if (item.confidence >= CONFIDENCE_THRESHOLD) {
        highConfidenceItems.push(item);
      } else {
        // Convert to RecentUpload format
        lowConfidenceItems.push({
          id: item.id,
          name: item.name,
          imageUrl: item.imageUrl,
          category: item.category,
          createdAt: new Date().toISOString()
        });
      }
    });
    
    // Process high confidence items to add directly to wardrobe
    if (highConfidenceItems.length > 0) {
      addItemsToWardrobe(highConfidenceItems);
    }
    
    // Process low confidence items to add to recent uploads
    if (lowConfidenceItems.length > 0) {
      addItemsToRecentUploads(lowConfidenceItems);
    }
    
    // Show appropriate toast messages
    if (highConfidenceItems.length > 0 && lowConfidenceItems.length > 0) {
      toast({
        title: "Articoli elaborati",
        description: `${highConfidenceItems.length} articoli aggiunti al guardaroba e ${lowConfidenceItems.length} in attesa di conferma.`,
        duration: 3000,
      });
    } else if (highConfidenceItems.length > 0) {
      toast({
        title: "Articoli aggiunti",
        description: `${highConfidenceItems.length} articoli aggiunti direttamente al guardaroba.`,
        duration: 1500,
      });
    } else if (lowConfidenceItems.length > 0) {
      toast({
        title: "Articoli in attesa",
        description: `${lowConfidenceItems.length} articoli in attesa di conferma.`,
        duration: 1500,
      });
    }
  };
  
  // Add items to wardrobe
  const addItemsToWardrobe = (items: ItemInference[]) => {
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
    setClothingItems(prevItems => {
      console.log(`Adding ${newClothingItems.length} new items to wardrobe`);
      console.log("Previous items count:", prevItems.length);
      return [...newClothingItems, ...prevItems];
    });
  };
  
  // Add items to recent uploads
  const addItemsToRecentUploads = (items: RecentUpload[]) => {
    // Add items to recent uploads for later confirmation
    setRecentUploadItems(prevItems => {
      console.log(`Adding ${items.length} new items to recent uploads`);
      return [...items, ...prevItems];
    });
  };

  // Handle confirmation of multiple inferred items
  const confirmMultipleInference = (items: ItemInference[]) => {
    if (!items.length) return;
    
    // Use the new process that applies confidence threshold
    processItems(items);
  };
  
  // Handle confirmation of single inferred item
  const confirmSingleInference = (selectedItem: ItemInference | null) => {
    if (!selectedItem) return;
    
    // Process the single item using the same confidence threshold logic
    processItems([selectedItem]);
  };

  return {
    confirmMultipleInference,
    confirmSingleInference
  };
};
