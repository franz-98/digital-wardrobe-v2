
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ItemInference, RecentUpload } from "@/components/home/types";

export const useItemInference = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemInference | null>(null);
  const [inferenceDialogOpen, setInferenceDialogOpen] = useState(false);
  
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

    // Prevent any input field from auto-focusing by delaying any potential
    // automatic focus that might occur after the dialog opens
    setTimeout(() => {
      // This will cause any currently focused element to lose focus
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }, 50);
  };

  const confirmInference = () => {
    if (!selectedItem) return;
    
    toast({
      title: "Item confermato",
      description: `"${selectedItem.name}" è stato aggiunto al tuo guardaroba.`,
    });
    setInferenceDialogOpen(false);
    setSelectedItem(null);
  };

  const handleInferenceEdit = (field: keyof ItemInference, value: string) => {
    if (!selectedItem) return;
    
    setSelectedItem(prev => 
      prev ? { ...prev, [field]: value } : null
    );
  };

  const handleDialogOpenChange = (open: boolean) => {
    setInferenceDialogOpen(open);
    if (!open) {
      // Reset selected item when dialog is closed
      setSelectedItem(null);
    }
  };

  return {
    isUploading,
    selectedItem,
    inferenceDialogOpen,
    inferredItems,
    handleFileChange,
    handleRecentItemClick,
    confirmInference,
    handleInferenceEdit,
    handleDialogOpenChange,
  };
};
