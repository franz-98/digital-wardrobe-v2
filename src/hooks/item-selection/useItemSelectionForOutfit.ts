
import { useState } from "react";
import { ClothingItem } from "@/components/wardrobe/types";

export function useItemSelectionForOutfit() {
  const [selectedItemsForOutfit, setSelectedItemsForOutfit] = useState<ClothingItem[]>([]);
  
  const toggleItemSelection = (item: ClothingItem) => {
    if (selectedItemsForOutfit.some(i => i.id === item.id)) {
      setSelectedItemsForOutfit(selectedItemsForOutfit.filter(i => i.id !== item.id));
    } else {
      setSelectedItemsForOutfit([...selectedItemsForOutfit, item]);
    }
  };

  return {
    selectedItemsForOutfit,
    setSelectedItemsForOutfit,
    toggleItemSelection
  };
}
