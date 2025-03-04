
import { useState } from "react";
import { ClothingItem, Outfit } from "@/components/wardrobe/types";

export function useItemSelection() {
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [isOutfitDetailsOpen, setIsOutfitDetailsOpen] = useState(false);
  const [selectedItemsForOutfit, setSelectedItemsForOutfit] = useState<ClothingItem[]>([]);
  
  const handleItemClick = (item: ClothingItem) => {
    setSelectedItem(item);
    setSelectedOutfit(null);
    setIsDetailsOpen(true);
    setIsOutfitDetailsOpen(false);
  };

  const handleOutfitClick = (outfit: Outfit) => {
    setSelectedOutfit(outfit);
    setSelectedItem(null);
    setIsOutfitDetailsOpen(true);
    setIsDetailsOpen(false);
  };
  
  const handleOutfitItemClick = (itemId: string, clothingItems: ClothingItem[]) => {
    // Check if this is an outfit ID (starts with 'o')
    if (itemId.startsWith('o')) {
      // This is an outfit ID - we don't do anything here as this should be handled by
      // the parent component's handleOutfitClick function
      return;
    }
    
    // Altrimenti è un elemento di abbigliamento
    const itemToShow = clothingItems.find(item => item.id === itemId);
    
    if (itemToShow) {
      setSelectedItem(itemToShow);
      setSelectedOutfit(null);
      setIsOutfitDetailsOpen(false);
      setIsDetailsOpen(true);
    }
  };

  const toggleItemSelection = (item: ClothingItem) => {
    if (selectedItemsForOutfit.some(i => i.id === item.id)) {
      setSelectedItemsForOutfit(selectedItemsForOutfit.filter(i => i.id !== item.id));
    } else {
      setSelectedItemsForOutfit([...selectedItemsForOutfit, item]);
    }
  };

  return {
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
    handleOutfitItemClick,
    toggleItemSelection
  };
}
