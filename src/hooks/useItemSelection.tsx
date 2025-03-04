
import { useState } from "react";
import { ClothingItem, Outfit } from "@/components/wardrobe/types";

export function useItemSelection() {
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [isOutfitDetailsOpen, setIsOutfitDetailsOpen] = useState(false);
  const [selectedItemsForOutfit, setSelectedItemsForOutfit] = useState<ClothingItem[]>([]);
  
  const handleItemClick = (item: ClothingItem) => {
    console.log("handleItemClick called with item:", item.name);
    setSelectedItem(item);
    setSelectedOutfit(null);
    setIsDetailsOpen(true);
    setIsOutfitDetailsOpen(false);
  };

  const handleOutfitClick = (outfit: Outfit) => {
    console.log("handleOutfitClick in useItemSelection called with outfit:", outfit);
    
    // Close any open item details first
    setIsDetailsOpen(false);
    setSelectedItem(null);
    
    // Set the outfit and open outfit details
    setSelectedOutfit(outfit);
    setIsOutfitDetailsOpen(true);
  };
  
  const handleOutfitItemClick = (itemId: string, clothingItems: ClothingItem[]) => {
    console.log("handleOutfitItemClick called with:", itemId);
    
    // Check if this is an outfit ID (starts with 'o')
    if (itemId.startsWith('o')) {
      // This is an outfit ID - we need to handle it specially
      console.log("Outfit ID detected, will open outfit directly");
      // This will be handled in the function caller where outfit data is available
      return;
    }
    
    // Find the clothing item
    const itemToShow = clothingItems.find(item => item.id === itemId);
    
    if (itemToShow) {
      console.log("Found item to show:", itemToShow.name);
      
      // Close any open outfit details first
      setIsOutfitDetailsOpen(false);
      setSelectedOutfit(null);
      
      // Then open item details
      setSelectedItem(itemToShow);
      setIsDetailsOpen(true);
    } else {
      console.log("Item not found with ID:", itemId);
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
