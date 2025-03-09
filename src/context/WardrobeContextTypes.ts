
import { ClothingItem, Outfit } from '@/components/wardrobe/types';

// Context type definition
export interface WardrobeContextType {
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

// Initial state with default values
export const initialWardrobeContext: WardrobeContextType = {
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
