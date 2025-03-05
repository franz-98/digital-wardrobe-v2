
import React from "react";
import { ClothingItem, Outfit } from "@/components/wardrobe/types";
import OutfitHeader from "@/components/wardrobe/outfit/OutfitHeader";
import OutfitCreationPanel from "@/components/wardrobe/outfit/OutfitCreationPanel";
import OutfitGrid from "@/components/wardrobe/outfit/OutfitGrid";
import OutfitSuggestions from "@/components/wardrobe/outfit/OutfitSuggestions";

interface OutfitTabProps {
  outfits: Outfit[];
  suggestedOutfits: Outfit[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;  // Added this prop
  isPremium: boolean;
  isCreatingOutfit: boolean;
  selectedItemsForOutfit: ClothingItem[];
  newOutfitName: string;
  setNewOutfitName: (name: string) => void;
  setIsCreatingOutfit: (value: boolean) => void;
  setActiveTab: (tab: string) => void;
  createNewOutfit: () => void;
  handleOutfitClick: (outfit: Outfit) => void;
  togglePremium: () => void;
  showSearchBar: boolean;
  toggleSearchBar: () => void;
}

const OutfitTab = ({
  outfits,
  suggestedOutfits,
  searchTerm,
  setSearchTerm,  // Added this prop
  isPremium,
  isCreatingOutfit,
  selectedItemsForOutfit,
  newOutfitName,
  setNewOutfitName,
  setIsCreatingOutfit,
  setActiveTab,
  createNewOutfit,
  handleOutfitClick,
  togglePremium,
  showSearchBar,
  toggleSearchBar
}: OutfitTabProps) => {
  
  const filteredOutfits = outfits.filter((outfit) =>
    outfit.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <OutfitHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}  // Pass the prop to OutfitHeader
        showSearchBar={showSearchBar}
        toggleSearchBar={toggleSearchBar}
        setIsCreatingOutfit={setIsCreatingOutfit}
        isCreatingOutfit={isCreatingOutfit}
        setActiveTab={setActiveTab}
      />
      
      <OutfitCreationPanel
        isCreatingOutfit={isCreatingOutfit}
        selectedItemsForOutfit={selectedItemsForOutfit}
        newOutfitName={newOutfitName}
        setNewOutfitName={setNewOutfitName}
        createNewOutfit={createNewOutfit}
      />
      
      <OutfitGrid 
        outfits={filteredOutfits} 
        handleOutfitClick={handleOutfitClick}
      />
      
      <OutfitSuggestions
        isPremium={isPremium}
        suggestedOutfits={suggestedOutfits}
        handleOutfitClick={handleOutfitClick}
        togglePremium={togglePremium}
      />
    </>
  );
};

export default OutfitTab;
