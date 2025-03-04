
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

// Import new components
import HomeHeader from "@/components/home/HomeHeader";
import UploadArea from "@/components/home/UploadArea";
import HowItWorksGuide from "@/components/home/HowItWorksGuide";
import RecentUploadsSection from "@/components/home/RecentUploadsSection";
import InferenceDialog from "@/components/home/InferenceDialog";

// Import types
import { RecentUpload, ItemInference } from "@/components/home/types";

const CLOTHING_CATEGORIES = [
  "Tops",
  "Bottoms",
  "Dresses",
  "Outerwear",
  "Footwear",
  "Accessories",
  "Underwear",
  "Swimwear",
  "Sportswear",
  "Sleepwear",
  "Formal",
  "Casual",
  "Business"
];

const HomePage = () => {
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

  const { data: recentUploads, isLoading } = useQuery({
    queryKey: ["recentUploads"],
    queryFn: async () => {
      const response = await fetch("/api/recent");
      if (!response.ok) throw new Error("Failed to fetch recent uploads");
      return response.json() as Promise<RecentUpload[]>;
    },
    placeholderData: [
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
    ],
  });

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
      name: "", // Empty initial name
      category: item.category,
      color: "",
      imageUrl: item.imageUrl,
      confidence: 1.0
    };
    
    setSelectedItem(inferredItem);
    setInferenceDialogOpen(true);
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

  return (
    <div className="flex flex-col items-center space-y-10 animate-fade-in">
      <HomeHeader />

      <div className="w-full">
        <UploadArea 
          isUploading={isUploading} 
          onFileSelected={handleFileChange} 
        />
        
        <HowItWorksGuide />

        <RecentUploadsSection 
          recentUploads={recentUploads} 
          isLoading={isLoading} 
          onItemClick={handleRecentItemClick} 
        />
      </div>

      <InferenceDialog 
        open={inferenceDialogOpen}
        onOpenChange={handleDialogOpenChange}
        selectedItem={selectedItem}
        onConfirm={confirmInference}
        onFieldChange={handleInferenceEdit}
        clothingCategories={CLOTHING_CATEGORIES}
      />
    </div>
  );
};

export default HomePage;
