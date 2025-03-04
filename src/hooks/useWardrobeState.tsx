
import { useWardrobe as wardrobeContextHook } from "@/context/WardrobeContext";
import { useWardrobeData } from "./useWardrobeData";
import { useWardrobeUI } from "./useWardrobeUI";
import { useItemSelection } from "./useItemSelection";
import { useWardrobeActions } from "./useWardrobeActions";
import { useNavigationEffects } from "./useNavigationEffects";

export function useWardrobeState() {
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
    handleOutfitClick,
    handleOutfitItemClick: baseHandleOutfitItemClick,
    toggleItemSelection
  } = useItemSelection();

  const handleOutfitItemClick = (itemId: string) => {
    baseHandleOutfitItemClick(itemId, clothingItems);
  };

  const {
    findRelatedOutfits,
    createNewOutfit,
    handleDeleteItem,
    handleDeleteOutfit,
    togglePremium: actionsTogglePremium,
    updateStatsForTimeRange,
    updateStatsForCustomRange
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
    updateStatsForTimeRange,
    updateStatsForCustomRange,
    handleOutfitClick,
    handleOutfitItemClick,
    handleDeleteItem,
    handleDeleteOutfit
  };
}

// Export the context hook for compatibility
export const useWardrobe = wardrobeContextHook;
