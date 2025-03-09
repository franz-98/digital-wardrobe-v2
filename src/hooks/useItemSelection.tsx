
import { ClothingItem } from "@/components/wardrobe/types";
import { 
  useItemClick,
  useOutfitClick,
  useOutfitItemClick,
  useItemSelectionForOutfit
} from "./item-selection";

export function useItemSelection() {
  // Use the smaller, more focused hooks
  const {
    selectedItem,
    setSelectedItem,
    isDetailsOpen,
    setIsDetailsOpen,
    handleItemClick
  } = useItemClick();

  const {
    selectedOutfit,
    setSelectedOutfit,
    isOutfitDetailsOpen,
    setIsOutfitDetailsOpen,
    handleOutfitClick
  } = useOutfitClick();

  const {
    selectedItemsForOutfit,
    setSelectedItemsForOutfit,
    toggleItemSelection
  } = useItemSelectionForOutfit();

  // The outfit item click handler needs access to state setters from other hooks
  const { handleOutfitItemClick } = useOutfitItemClick(
    setIsOutfitDetailsOpen,
    setSelectedOutfit,
    setSelectedItem,
    setIsDetailsOpen
  );

  return {
    // Item selection state
    selectedItem,
    setSelectedItem,
    isDetailsOpen,
    setIsDetailsOpen,
    
    // Outfit selection state
    selectedOutfit,
    setSelectedOutfit,
    isOutfitDetailsOpen,
    setIsOutfitDetailsOpen,
    
    // Item for outfit selection state
    selectedItemsForOutfit,
    setSelectedItemsForOutfit,
    
    // Handlers
    handleItemClick,
    handleOutfitClick,
    handleOutfitItemClick,
    toggleItemSelection
  };
}
