
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

  return {
    handleFileChange
  };
};
