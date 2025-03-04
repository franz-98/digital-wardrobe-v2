
import React from "react";
import { Tabs } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import WardrobeHeader from "@/components/wardrobe/WardrobeHeader";
import WardrobeTabsNav from "@/components/wardrobe/WardrobeTabsNav";
import WardrobeTabContent from "@/components/wardrobe/WardrobeTabContent";
import WardrobeDialogs from "@/components/wardrobe/WardrobeDialogs";
import SwipeHandler from "@/components/wardrobe/SwipeHandler";
import { useWardrobe } from "@/context/WardrobeContext";

const WardrobeContainer = () => {
  const {
    activeTab,
    setActiveTab,
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
    createNewOutfit,
    toggleItemSelection,
    handleItemClick,
    handleOutfitClick,
    togglePremium,
    handleDeleteItem,
    updateStatsForTimeRange,
    updateStatsForCustomRange,
    showSearchBar,
    toggleSearchBar,
    selectedItem,
    selectedOutfit,
    isDetailsOpen,
    isOutfitDetailsOpen,
    setIsDetailsOpen,
    setIsOutfitDetailsOpen,
    findRelatedOutfits,
    handleOutfitItemClick,
    handleDeleteOutfit
  } = useWardrobe();

  return (
    <SwipeHandler activeTab={activeTab} setActiveTab={setActiveTab}>
      <WardrobeHeader />

      <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
        <WardrobeTabsNav activeTab={activeTab} />
        
        <div className="mt-4 flex items-center justify-between h-10">
          {activeTab === "outfits" && (
            <div className="flex justify-between w-full">
              <h2 className="text-xl font-semibold">My Outfits</h2>
              <button 
                className="ml-auto"
                onClick={toggleSearchBar}
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          )}
          
          {activeTab === "clothing" && (
            <div className="flex justify-between w-full">
              <h2 className="text-xl font-semibold">My Clothing</h2>
              <Button 
                variant="ghost"
                size="icon"
                onClick={toggleSearchBar}
                className="ml-auto"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
        
        <WardrobeTabContent
          activeTab={activeTab}
          clothingItems={clothingItems}
          outfits={outfits}
          suggestedOutfits={suggestedOutfits}
          searchTerm={searchTerm}
          isCreatingOutfit={isCreatingOutfit}
          selectedItemsForOutfit={selectedItemsForOutfit}
          newOutfitName={newOutfitName}
          isPremium={isPremium}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          setNewOutfitName={setNewOutfitName}
          setSelectedItemsForOutfit={setSelectedItemsForOutfit}
          setIsCreatingOutfit={setIsCreatingOutfit}
          setActiveTab={setActiveTab}
          createNewOutfit={createNewOutfit}
          toggleItemSelection={toggleItemSelection}
          handleItemClick={handleItemClick}
          handleOutfitClick={handleOutfitClick}
          togglePremium={togglePremium}
          handleDeleteItem={handleDeleteItem}
          updateStatsForTimeRange={updateStatsForTimeRange}
          updateStatsForCustomRange={updateStatsForCustomRange}
          showSearchBar={showSearchBar}
          toggleSearchBar={toggleSearchBar}
        />
      </Tabs>
      
      <WardrobeDialogs
        selectedItem={selectedItem}
        selectedOutfit={selectedOutfit}
        isDetailsOpen={isDetailsOpen}
        isOutfitDetailsOpen={isOutfitDetailsOpen}
        setIsDetailsOpen={setIsDetailsOpen}
        setIsOutfitDetailsOpen={setIsOutfitDetailsOpen}
        findRelatedOutfits={findRelatedOutfits}
        handleDeleteItem={handleDeleteItem}
        handleDeleteOutfit={handleDeleteOutfit}
        handleOutfitItemClick={handleOutfitItemClick}
      />
    </SwipeHandler>
  );
};

export default WardrobeContainer;
