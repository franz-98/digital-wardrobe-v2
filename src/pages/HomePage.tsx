
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
import MultipleInferenceDialog from "@/components/home/MultipleInferenceDialog";

const CLOTHING_CATEGORIES = [
  // General categories
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
  "Business",
  
  // Specific clothing items
  "T-shirt",
  "Shirt",
  "Sweater",
  "Hoodie",
  "Sweatshirt",
  "Top",
  "Jacket",
  "Coat",
  "Blazer",
  "Pants",
  "Jeans",
  "Shorts",
  "Skirt",
  "Leggings",
  "Dress",
  "Suit",
  "Shoes",
  "Boots",
  "Hat",
  "Cap",
  "Scarf",
  "Tie",
  "Belt",
  "Handbag",
  "Watch",
  "Jewelry",
  "Necklace",
  "Bracelet",
  "Sunglasses",
  "Other"
];

const HomePage = () => {
  // We're no longer using the API data since we're using localStorage-backed state
  const { isLoading: isLoadingFromAPI } = useRecentUploads();
  
  // Use custom hooks for state management and item inference
  const {
    isUploading,
    // Single item inference
    selectedItem,
    inferenceDialogOpen,
    // Multiple items inference
    inferredItems,
    multipleInferenceDialogOpen,
    // Recent uploads
    recentUploadItems,
    // Handlers
    handleFileChange,
    handleRecentItemClick,
    confirmSingleInference,
    confirmMultipleInference,
    handleSingleInferenceEdit,
    handleMultipleInferenceEdit,
    handleSingleDialogOpenChange,
    handleMultipleDialogOpenChange,
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

      {/* Single item inference dialog */}
      <InferenceDialog 
        open={inferenceDialogOpen}
        onOpenChange={handleSingleDialogOpenChange}
        selectedItem={selectedItem}
        onConfirm={confirmSingleInference}
        onFieldChange={handleSingleInferenceEdit}
        clothingCategories={CLOTHING_CATEGORIES}
      />

      {/* Multiple items inference dialog */}
      <MultipleInferenceDialog
        open={multipleInferenceDialogOpen}
        onOpenChange={handleMultipleDialogOpenChange}
        inferredItems={inferredItems}
        onConfirm={confirmMultipleInference}
        clothingCategories={CLOTHING_CATEGORIES}
      />
    </div>
  );
};

export default HomePage;
