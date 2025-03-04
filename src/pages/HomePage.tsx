
import { useState } from "react";

// Import hooks
import { useRecentUploads } from "@/hooks/useRecentUploads";
import { useItemInference } from "@/hooks/useItemInference";

// Import components
import HomeHeader from "@/components/home/HomeHeader";
import UploadArea from "@/components/home/UploadArea";
import HowItWorksGuide from "@/components/home/HowItWorksGuide";
import RecentUploadsSection from "@/components/home/RecentUploadsSection";
import InferenceDialog from "@/components/home/InferenceDialog";

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
  // Use React Query for data fetching (but we won't use this data directly anymore)
  const { isLoading: isLoadingFromAPI } = useRecentUploads();
  
  // Use custom hooks for state management and item inference
  const {
    isUploading,
    selectedItem,
    inferenceDialogOpen,
    recentUploadItems, // Use the local state from the hook
    handleFileChange,
    handleRecentItemClick,
    confirmInference,
    handleInferenceEdit,
    handleDialogOpenChange,
  } = useItemInference();

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
          recentUploads={recentUploadItems} // Use our local state instead of API data
          isLoading={isLoadingFromAPI && recentUploadItems.length === 0}
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
