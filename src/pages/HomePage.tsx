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
  // We're no longer using the API data since we're using localStorage-backed state
  const { isLoading: isLoadingFromAPI } = useRecentUploads();
  
  // Use custom hooks for state management and item inference
  const {
    isUploading,
    selectedItem,
    inferenceDialogOpen,
    recentUploadItems,
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
          recentUploads={recentUploadItems}
          isLoading={false} // We always use the local state now, never loading
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
