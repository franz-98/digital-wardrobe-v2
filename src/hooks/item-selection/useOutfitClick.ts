
import { useState } from "react";
import { Outfit } from "@/components/wardrobe/types";

export function useOutfitClick() {
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [isOutfitDetailsOpen, setIsOutfitDetailsOpen] = useState(false);
  
  const handleOutfitClick = (outfit: Outfit) => {
    console.log("handleOutfitClick in useItemSelection called with outfit:", outfit);
    
    setSelectedOutfit(outfit);
    setIsOutfitDetailsOpen(true);
  };

  return {
    selectedOutfit,
    setSelectedOutfit,
    isOutfitDetailsOpen,
    setIsOutfitDetailsOpen,
    handleOutfitClick
  };
}
