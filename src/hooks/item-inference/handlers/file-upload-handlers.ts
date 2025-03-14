
import { toast } from "@/components/ui/use-toast";
import { ItemInference, RecentUpload } from "../types";

/**
 * Handlers related to file uploads and processing
 */
export const createFileUploadHandlers = (
  setInferredItems: React.Dispatch<React.SetStateAction<ItemInference[]>>,
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>,
  setMultipleInferenceDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
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
      
      // Generate outfit name based on timestamp
      const outfitName = `Outfit ${new Date().toLocaleDateString('it-IT')}`;
      
      // Create test data with varying confidence levels to demonstrate threshold behavior
      const mockItems: ItemInference[] = [
        {
          id: `item-${Date.now()}-1`,
          name: "Camicia Blu",
          category: "Shirt",
          color: "Blue",
          imageUrl: sharedImageUrl,
          confidence: 0.95, // High confidence - should go directly to wardrobe
          outfitId: outfitName
        },
        {
          id: `item-${Date.now()}-2`,
          name: "Pantaloni Neri", 
          category: "Pants",
          color: "Black",
          imageUrl: sharedImageUrl,
          confidence: 0.92, // High confidence - should go directly to wardrobe
          outfitId: outfitName
        },
        {
          id: `item-${Date.now()}-3`,
          name: "Giacca Verde",
          category: "Jacket", 
          color: "Green",
          imageUrl: sharedImageUrl,
          confidence: 0.68, // Below 75% - should go to recent uploads
          outfitId: outfitName
        },
        {
          id: `item-${Date.now()}-4`,
          name: "Scarpe Marroni",
          category: "Shoes",
          color: "Brown", 
          imageUrl: sharedImageUrl,
          confidence: 0.65, // Below 75% - should go to recent uploads
          outfitId: outfitName
        },
        {
          id: `item-${Date.now()}-5`,
          name: "Accessorio Rosso",
          category: "Accessories",
          color: "Red",
          imageUrl: sharedImageUrl, 
          confidence: 0.82, // High confidence - should go directly to wardrobe
          outfitId: outfitName
        }
      ];
      
      console.log(`Generated ${mockItems.length} mock items for inference with varying confidence levels`);
      
      // Set the inferred items and open the multiple inference dialog
      setInferredItems(mockItems);
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

  return {
    handleFileChange
  };
};
