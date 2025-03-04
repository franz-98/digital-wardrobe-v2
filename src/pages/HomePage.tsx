
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
  // Use custom hooks for data fetching and state management
  const { data: recentUploads, isLoading } = useRecentUploads();
  const {
    isUploading,
    selectedItem,
    inferenceDialogOpen,
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
