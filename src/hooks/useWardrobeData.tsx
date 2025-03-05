
import { useState } from "react";
import { ClothingItem } from "@/components/wardrobe/types";
import { DEFAULT_CLOTHING_ITEMS } from "./wardrobe/default-wardrobe-data";
import { loadClothingItems, saveClothingItems } from "./wardrobe/wardrobe-storage";
import { useOutfitManager } from "./wardrobe/useOutfitManager";

export function useWardrobeData() {
  // Load items from localStorage or use defaults
  const [clothingItems, setClothingItemsState] = useState<ClothingItem[]>(() => {
    const savedItems = loadClothingItems();
    return savedItems.length > 0 ? savedItems : DEFAULT_CLOTHING_ITEMS;
  });
  
  // Wrapper for setClothingItems that also updates localStorage
  const setClothingItems = (itemsOrUpdater: ClothingItem[] | ((prev: ClothingItem[]) => ClothingItem[])) => {
    setClothingItemsState(prevItems => {
      const newItems = typeof itemsOrUpdater === 'function' 
        ? itemsOrUpdater(prevItems) 
        : itemsOrUpdater;
        
      // Save to localStorage
      saveClothingItems(newItems);
      
      return newItems;
    });
  };
  
  // Use the outfit manager hook to handle outfits
  const { outfits, setOutfits, suggestedOutfits } = useOutfitManager(clothingItems);

  return {
    clothingItems,
    setClothingItems,
    outfits,
    setOutfits,
    suggestedOutfits
  };
}
