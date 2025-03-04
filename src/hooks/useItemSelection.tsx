
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
    // First ensure any open item details are closed
    setIsDetailsOpen(false);
    
    // Then set the outfit and open outfit details
    setSelectedOutfit(outfit);
    setSelectedItem(null);
    
    // A slight delay to ensure the item dialog is properly closed first
    setTimeout(() => {
      setIsOutfitDetailsOpen(true);
    }, 50);
  };
  
  const handleOutfitItemClick = (itemId: string, clothingItems: ClothingItem[]) => {
    console.log("handleOutfitItemClick called with:", itemId);
    
    // Check if this is an outfit ID (starts with 'o')
    if (itemId.startsWith('o')) {
      // This will be handled in the parent component that has access to outfits collection
      console.log("Outfit ID detected, handling at parent level");
      return;
    }
    
    // Find the clothing item
    const itemToShow = clothingItems.find(item => item.id === itemId);
    
    if (itemToShow) {
      console.log("Found item to show:", itemToShow.name);
      
      // Ensure we close any open outfit details first
      setIsOutfitDetailsOpen(false);
      
      // Immediately open item details without delay
      setSelectedItem(itemToShow);
      setSelectedOutfit(null);
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
