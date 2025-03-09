import { useState, useEffect } from "react";
import { ClothingItem, Outfit } from "@/components/wardrobe/types";
import { createDefaultOutfits, createDefaultSuggestedOutfits } from "./default-wardrobe-data";
import { loadOutfits, saveOutfits } from "./storage";

export function useOutfitManager(clothingItems: ClothingItem[]) {
  const [outfits, setOutfitsState] = useState<Outfit[]>(() => {
    const savedOutfits = loadOutfits();
    return savedOutfits.length > 0 ? savedOutfits : createDefaultOutfits(clothingItems);
  });
  
  const [suggestedOutfits, setSuggestedOutfits] = useState<Outfit[]>([]);

  // Update outfits when clothing items change
  useEffect(() => {
    if (clothingItems.length > 0) {
      // Only set default outfits if we don't have any yet
      if (outfits.length === 0) {
        setOutfitsState(createDefaultOutfits(clothingItems));
      }
      
      // Always update suggested outfits
      setSuggestedOutfits(createDefaultSuggestedOutfits(clothingItems));
    }
  }, [clothingItems, outfits.length]);

  // Wrapper for setOutfits that also updates localStorage
  const setOutfits = (itemsOrUpdater: Outfit[] | ((prev: Outfit[]) => Outfit[])) => {
    setOutfitsState(prevItems => {
      const newItems = typeof itemsOrUpdater === 'function' 
        ? itemsOrUpdater(prevItems) 
        : itemsOrUpdater;
        
      // Save to localStorage
      saveOutfits(newItems);
      
      return newItems;
    });
  };

  return {
    outfits,
    setOutfits,
    suggestedOutfits,
    setSuggestedOutfits
  };
}
