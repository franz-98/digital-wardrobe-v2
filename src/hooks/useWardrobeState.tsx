
import { useWardrobeData } from "./useWardrobeData";
import { useWardrobeUI } from "./useWardrobeUI";
import { useItemSelection } from "./useItemSelection";
import { useWardrobeActions } from "./useWardrobeActions";
import { useNavigationEffects } from "./useNavigationEffects";
import { Outfit } from "@/components/wardrobe/types";

// Rename the function to _useWardrobeState to avoid conflict with export
function _useWardrobeState() {
  const {
    clothingItems,
    setClothingItems,
    outfits,
    setOutfits,
    suggestedOutfits
  } = useWardrobeData();

  const {
    isPremium,
    setIsPremium,
    isCreatingOutfit,
    setIsCreatingOutfit,
    newOutfitName,
    setNewOutfitName,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    showSearchBar,
    timeRange,
    setTimeRange,
    toggleSearchBar,
    togglePremium: uiTogglePremium
  } = useWardrobeUI();

  const {
    selectedItem,
    setSelectedItem,
    isDetailsOpen,
    setIsDetailsOpen,
    selectedOutfit,
    setSelectedOutfit,
    isOutfitDetailsOpen,
    setIsOutfitDetailsOpen,
    selectedItemsForOutfit,
    setSelectedItemsForOutfit,
    handleItemClick,
    handleOutfitClick: baseHandleOutfitClick,
    handleOutfitItemClick: baseHandleOutfitItemClick,
    toggleItemSelection
  } = useItemSelection();

  // Enhanced handleOutfitItemClick function that can find outfits by ID
  const handleOutfitItemClick = (itemId: string) => {
    // Check if this is an outfit ID
    if (itemId.startsWith('o')) {
      console.log("Processing outfit ID:", itemId);
      // Find the outfit in our data
      const outfitToShow = outfits.find(outfit => outfit.id === itemId) || 
                          suggestedOutfits.find(outfit => outfit.id === itemId);
      
      if (outfitToShow) {
        console.log("Found outfit to display:", outfitToShow.name);
        // Use the outfit click handler to show the outfit details
        handleOutfitClick(outfitToShow);
      } else {
        console.log("Outfit not found with ID:", itemId);
      }
    } else {
      // Handle normal item clicks
      baseHandleOutfitItemClick(itemId, clothingItems);
    }
  };

  // Explicitly handle outfit clicks
  const handleOutfitClick = (outfit: Outfit) => {
    baseHandleOutfitClick(outfit);
  };

  const {
    findRelatedOutfits,
    createNewOutfit,
    updateOutfitImage,
    handleDeleteItem,
    handleDeleteOutfit,
    togglePremium: actionsTogglePremium,
    updateStatsForTimeRange,
    updateStatsForCustomRange,
    updateItemName,
    updateOutfitName,
    updateItemMetadata
  } = useWardrobeActions({
    outfits,
    clothingItems,
    setOutfits,
    setClothingItems,
    selectedItemsForOutfit,
    newOutfitName,
    setNewOutfitName,
    setSelectedItemsForOutfit,
    setIsCreatingOutfit,
    isPremium,
    setIsPremium
  });

  useNavigationEffects();

  // Combine toggle premium functions
  const togglePremium = () => {
    uiTogglePremium();
    actionsTogglePremium();
  };

  return {
    clothingItems,
    outfits,
    suggestedOutfits,
    isPremium,
    selectedItemsForOutfit,
    isCreatingOutfit,
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
    updateItemName,
    updateOutfitName,
    updateItemMetadata
  };
}

// Export the hook with the name useWardrobeState for external use
export const useWardrobeState = _useWardrobeState;
