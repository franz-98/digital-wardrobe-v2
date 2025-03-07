
import { ClothingItem, Outfit } from "@/components/wardrobe/types";

export interface WardrobeActionsProps {
  outfits: Outfit[];
  clothingItems: ClothingItem[];
  setOutfits: (outfits: Outfit[]) => void;
  setClothingItems: (items: ClothingItem[]) => void;
  selectedItemsForOutfit: ClothingItem[];
  newOutfitName: string;
  setNewOutfitName: (name: string) => void;
  setSelectedItemsForOutfit: (items: ClothingItem[]) => void;
  setIsCreatingOutfit: (value: boolean) => void;
  isPremium: boolean;
  setIsPremium: (value: boolean) => void;
}
