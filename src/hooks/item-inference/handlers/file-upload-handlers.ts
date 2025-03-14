
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
      
      // Generate mock items with consistent, predictable data
      const itemCount = 5; // Fixed number of items for consistent testing
      const mockCategories = ["Tops", "Bottoms", "Outerwear", "Accessories", "Footwear"];
      const mockColors = ["Blue", "Black", "White", "Red", "Green"];
      
      const inferredItems: ItemInference[] = [];
      
      // Generate the specified number of mock items with consistent data
      for (let i = 0; i < itemCount; i++) {
        const category = mockCategories[i % mockCategories.length];
        const color = mockColors[i % mockColors.length];
        
        inferredItems.push({
          id: `inferred-${Date.now()}-${i}`,
          name: `${color} ${category}`, 
          category: category,
          color: color,
          imageUrl: sharedImageUrl,
          confidence: 0.75 + (Math.random() * 0.2) // Between 0.75 and 0.95
        });
      }
      
      console.log(`Generated ${inferredItems.length} mock items for inference`);
      
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
