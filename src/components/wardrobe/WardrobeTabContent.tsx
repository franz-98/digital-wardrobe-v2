
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import ClothingTab from "@/components/wardrobe/ClothingTab";
import OutfitTab from "@/components/wardrobe/OutfitTab";
import StatsTab from "@/components/wardrobe/StatsTab";
import OutfitCreation from "@/components/wardrobe/OutfitCreation";
import { ClothingItem, Outfit } from "@/components/wardrobe/types";

interface WardrobeTabContentProps {
  activeTab: string;
  clothingItems: ClothingItem[];
  outfits: Outfit[];
  suggestedOutfits: Outfit[];
  searchTerm: string;
  isCreatingOutfit: boolean;
  selectedItemsForOutfit: ClothingItem[];
  newOutfitName: string;
  isPremium: boolean;
  timeRange: string;
  setTimeRange: (range: string) => void;
  setNewOutfitName: (name: string) => void;
  setSelectedItemsForOutfit: (items: ClothingItem[]) => void;
  setIsCreatingOutfit: (value: boolean) => void;
  setActiveTab: (tab: string) => void;
  createNewOutfit: () => void;
  toggleItemSelection: (item: ClothingItem) => void;
  handleItemClick: (item: ClothingItem) => void;
  handleOutfitClick: (outfit: Outfit) => void;
  togglePremium: () => void;
  handleDeleteItem: (id: string) => void;
  updateStatsForTimeRange: (range: string) => void;
  updateStatsForCustomRange: (start: Date, end: Date) => void;
}

const WardrobeTabContent = ({
  activeTab,
  clothingItems,
  outfits,
  suggestedOutfits,
  searchTerm,
  isCreatingOutfit,
  selectedItemsForOutfit,
  newOutfitName,
  isPremium,
  timeRange,
  setTimeRange,
  setNewOutfitName,
  setSelectedItemsForOutfit,
  setIsCreatingOutfit,
  setActiveTab,
  createNewOutfit,
  toggleItemSelection,
  handleItemClick,
  handleOutfitClick,
  togglePremium,
  handleDeleteItem,
  updateStatsForTimeRange,
  updateStatsForCustomRange
}: WardrobeTabContentProps) => {
  return (
    <>
      <TabsContent value="clothing" className="mt-4">
        <OutfitCreation 
          isCreatingOutfit={isCreatingOutfit}
          selectedItemsForOutfit={selectedItemsForOutfit}
          newOutfitName={newOutfitName}
          setNewOutfitName={setNewOutfitName}
          setSelectedItemsForOutfit={setSelectedItemsForOutfit}
          setIsCreatingOutfit={setIsCreatingOutfit}
          createNewOutfit={createNewOutfit}
        />
        
        <ClothingTab 
          clothingItems={clothingItems}
          searchTerm={searchTerm}
          isCreatingOutfit={isCreatingOutfit}
          selectedItemsForOutfit={selectedItemsForOutfit}
          toggleItemSelection={toggleItemSelection}
          handleItemClick={handleItemClick}
          handleDeleteItem={handleDeleteItem}
        />
      </TabsContent>
      
      <TabsContent value="outfits" className="mt-4">
        <OutfitTab
          outfits={outfits}
          suggestedOutfits={suggestedOutfits}
          searchTerm={searchTerm}
          isPremium={isPremium}
          isCreatingOutfit={isCreatingOutfit}
          selectedItemsForOutfit={selectedItemsForOutfit}
          newOutfitName={newOutfitName}
          setNewOutfitName={setNewOutfitName}
          setIsCreatingOutfit={setIsCreatingOutfit}
          setActiveTab={setActiveTab}
          createNewOutfit={createNewOutfit}
          handleOutfitClick={handleOutfitClick}
          togglePremium={togglePremium}
        />
      </TabsContent>
      
      <TabsContent value="stats" className="mt-4">
        <StatsTab 
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          updateStatsForTimeRange={updateStatsForTimeRange}
          updateStatsForCustomRange={updateStatsForCustomRange}
        />
      </TabsContent>
    </>
  );
};

export default WardrobeTabContent;
