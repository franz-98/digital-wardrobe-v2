import React, { createContext, useContext } from 'react';
import { ClothingItem, Outfit } from '@/components/wardrobe/types';
import { 
  useWardrobeData,
  useWardrobeUI, 
  useItemSelection,
  useWardrobeActions,
  useNavigationEffects 
} from '../hooks/wardrobeHooks';

// Create a type for the context values
interface WardrobeContextType {
  clothingItems: ClothingItem[];
  outfits: Outfit[];
  suggestedOutfits: Outfit[];
  isPremium: boolean;
  selectedItemsForOutfit: ClothingItem[];
  isCreatingOutfit: boolean;
  newOutfitName: string;
  searchTerm: string;
  activeTab: string;
  selectedItem: ClothingItem | null;
  isDetailsOpen: boolean;
  timeRange: string;
  showSearchBar: boolean;
  selectedOutfit: Outfit | null;
  isOutfitDetailsOpen: boolean;
  setNewOutfitName: (name: string) => void;
  setSelectedItemsForOutfit: (items: ClothingItem[]) => void;
  setIsCreatingOutfit: (value: boolean) => void;
  setActiveTab: (tab: string) => void;
  setTimeRange: (range: string) => void;
  setSearchTerm: (term: string) => void;
  setIsDetailsOpen: (isOpen: boolean) => void;
  setIsOutfitDetailsOpen: (isOpen: boolean) => void;
  handleItemClick: (item: ClothingItem) => void;
  findRelatedOutfits: (itemId: string) => Outfit[];
  toggleSearchBar: () => void;
  togglePremium: () => void;
  toggleItemSelection: (item: ClothingItem) => void;
  createNewOutfit: () => void;
  updateOutfitImage: (outfitId: string, imageUrl: string) => void;
  updateStatsForTimeRange: (range: string) => void;
  updateStatsForCustomRange: (start: Date, end: Date) => void;
  handleOutfitClick: (outfit: Outfit) => void;
  handleOutfitItemClick: (itemId: string) => void;
  handleDeleteItem: (itemId: string) => void;
  handleDeleteOutfit: (outfitId: string) => void;
  updateItemName: (itemId: string, newName: string) => boolean;
  updateOutfitName: (outfitId: string, newName: string) => boolean;
  updateItemMetadata: (itemId: string, field: string, value: string) => boolean;
}

// Create an initial state object with default values
const initialWardrobeContext: WardrobeContextType = {
  clothingItems: [],
  outfits: [],
  suggestedOutfits: [],
  isPremium: false,
  selectedItemsForOutfit: [],
  isCreatingOutfit: false,
  newOutfitName: "",
  searchTerm: "",
  activeTab: "clothing",
  selectedItem: null,
  isDetailsOpen: false,
  timeRange: "month",
  showSearchBar: false,
  selectedOutfit: null,
  isOutfitDetailsOpen: false,
  setNewOutfitName: () => {},
  setSelectedItemsForOutfit: () => {},
  setIsCreatingOutfit: () => {},
  setActiveTab: () => {},
  setTimeRange: () => {},
  setSearchTerm: () => {},
  setIsDetailsOpen: () => {},
  setIsOutfitDetailsOpen: () => {},
  handleItemClick: () => {},
  findRelatedOutfits: () => [],
  toggleSearchBar: () => {},
  togglePremium: () => {},
  toggleItemSelection: () => {},
  createNewOutfit: () => {},
  updateOutfitImage: () => {},
  updateStatsForTimeRange: () => {},
  updateStatsForCustomRange: () => {},
  handleOutfitClick: () => {},
  handleOutfitItemClick: () => {},
  handleDeleteItem: () => {},
  handleDeleteOutfit: () => {},
  updateItemName: () => false,
  updateOutfitName: () => false,
  updateItemMetadata: () => false
};

// Create the context with the initial state
const WardrobeContext = createContext<WardrobeContextType>(initialWardrobeContext);

// Create a custom hook to use the context
export const useWardrobe = () => {
  return useContext(WardrobeContext);
};

// Create a provider component
export const WardrobeProvider = ({ children }: { children: React.ReactNode }) => {
  // Use hooks directly - no require statement
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

  const value = {
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
  
  return (
    <WardrobeContext.Provider value={value}>
      {children}
    </WardrobeContext.Provider>
  );
};
