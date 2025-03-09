
import React, { createContext, useContext, useState } from 'react';
import { ClothingItem, Outfit } from '@/components/wardrobe/types';
import { useWardrobeState } from '@/hooks/useWardrobeState';

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

// Create the context with a default empty value
const WardrobeContext = createContext<WardrobeContextType | undefined>(undefined);

// Create a provider component
export const WardrobeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wardrobeState = useWardrobeState();
  
  return (
    <WardrobeContext.Provider value={wardrobeState}>
      {children}
    </WardrobeContext.Provider>
  );
};

// Create a custom hook to use the context
export const useWardrobe = () => {
  const context = useContext(WardrobeContext);
  if (context === undefined) {
    throw new Error('useWardrobe must be used within a WardrobeProvider');
  }
  return context;
};
