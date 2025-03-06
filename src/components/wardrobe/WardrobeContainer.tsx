
import React from "react";
import WardrobeHeader from "@/components/wardrobe/WardrobeHeader";
import WardrobeTabsNav from "@/components/wardrobe/WardrobeTabsNav";
import WardrobeTabContent from "@/components/wardrobe/WardrobeTabContent";
import WardrobeDialogs from "@/components/wardrobe/WardrobeDialogs";
import { Tabs } from "@/components/ui/tabs";
import { useWardrobe } from "@/context/WardrobeContext";
import SwipeHandler from "@/components/wardrobe/SwipeHandler";

const WardrobeContainer = () => {
  const {
    clothingItems,
    outfits,
    suggestedOutfits,
    isPremium,
    isCreatingOutfit,
    selectedItemsForOutfit,
    newOutfitName,
    searchTerm,
    activeTab,
    selectedItem,
    isDetailsOpen,
    timeRange,
    showSearchBar,
    selectedOutfit,
    isOutfitDetailsOpen,
    setNewOutfitName,
    setSelectedItemsForOutfit,
    setIsCreatingOutfit,
    setActiveTab,
    setTimeRange,
    setSearchTerm,
    setIsDetailsOpen,
    setIsOutfitDetailsOpen,
    handleItemClick,
    findRelatedOutfits,
    toggleSearchBar,
    togglePremium,
    toggleItemSelection,
    createNewOutfit,
    updateOutfitImage,
    updateStatsForTimeRange,
    updateStatsForCustomRange,
    handleOutfitClick,
    handleOutfitItemClick,
    handleDeleteItem,
    handleDeleteOutfit,
  } = useWardrobe();

  return (
    <div className="w-full h-full flex flex-col pb-20">
      <WardrobeHeader 
        activeTab={activeTab}
        showSearchBar={showSearchBar}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        toggleSearchBar={toggleSearchBar}
      />
      
      <Tabs value={activeTab} className="flex-1 flex flex-col">
        <WardrobeTabsNav 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          isCreatingOutfit={isCreatingOutfit}
          setIsCreatingOutfit={setIsCreatingOutfit}
        />
        
        <SwipeHandler activeTab={activeTab} setActiveTab={setActiveTab}>
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
            setSearchTerm={setSearchTerm}
          />
        </SwipeHandler>
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
        updateOutfitImage={updateOutfitImage}
      />
    </div>
  );
};

export default WardrobeContainer;
