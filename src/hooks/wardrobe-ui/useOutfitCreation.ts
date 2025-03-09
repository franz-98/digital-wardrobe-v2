
import { useState } from "react";

export function useOutfitCreation() {
  const [isCreatingOutfit, setIsCreatingOutfit] = useState(false);
  const [newOutfitName, setNewOutfitName] = useState("");

  return {
    isCreatingOutfit,
    setIsCreatingOutfit,
    newOutfitName,
    setNewOutfitName
  };
}
