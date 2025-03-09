
import { ClothingItem } from "@/components/wardrobe/types";

export function useOutfitItemClick(
  setIsOutfitDetailsOpen: (isOpen: boolean) => void,
  setSelectedOutfit: (outfit: null) => void,
  setSelectedItem: (item: ClothingItem) => void,
  setIsDetailsOpen: (isOpen: boolean) => void
) {
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

  return {
    handleOutfitItemClick
  };
}
