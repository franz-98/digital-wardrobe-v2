
import { useToast } from "@/hooks/use-toast";
import { ClothingItem, Outfit } from "@/components/wardrobe/types";
import { WardrobeActionsProps } from "./types";

export function useOutfitActions({
  outfits,
  setOutfits,
  selectedItemsForOutfit,
  newOutfitName,
  setNewOutfitName,
  setSelectedItemsForOutfit,
  setIsCreatingOutfit,
}: Pick<WardrobeActionsProps, 
  "outfits" | 
  "setOutfits" | 
  "selectedItemsForOutfit" | 
  "newOutfitName" | 
  "setNewOutfitName" | 
  "setSelectedItemsForOutfit" | 
  "setIsCreatingOutfit"
>) {
  const { toast } = useToast();

  const findRelatedOutfits = (itemId: string) => {
    return outfits.filter((outfit) =>
      outfit.items.some((item) => item.id === itemId)
    );
  };

  const createNewOutfit = () => {
    if (selectedItemsForOutfit.length > 0 && newOutfitName.trim()) {
      const newOutfit: Outfit = {
        id: `o${outfits.length + 1}`,
        name: newOutfitName,
        items: selectedItemsForOutfit,
        imageUrl: selectedItemsForOutfit[0].imageUrl,
        createdAt: new Date().toISOString(),
        season: "All Seasons", // Default season
      };
      
      setOutfits([...outfits, newOutfit]);
      setNewOutfitName("");
      setSelectedItemsForOutfit([]);
      setIsCreatingOutfit(false);
      
      toast({
        title: "Outfit created!",
        description: `"${newOutfitName}" has been added to your outfits.`,
      });
    }
  };

  const updateOutfitImage = (outfitId: string, imageUrl: string) => {
    const updatedOutfits = outfits.map(outfit => {
      if (outfit.id === outfitId) {
        return { ...outfit, imageUrl };
      }
      return outfit;
    });
    
    setOutfits(updatedOutfits);
    
    console.log(`Updated image for outfit ${outfitId}`);
  };

  const handleDeleteOutfit = (outfitId: string) => {
    const updatedOutfits = outfits.filter(outfit => outfit.id !== outfitId);
    setOutfits(updatedOutfits);
    
    toast({
      title: "Outfit deleted",
      description: "The outfit has been removed from your wardrobe.",
    });
  };

  const updateOutfitName = (outfitId: string, newName: string) => {
    if (!newName.trim()) {
      toast({
        title: "Invalid name",
        description: "Please enter a valid name for this outfit.",
        variant: "destructive"
      });
      return false;
    }

    const updatedOutfits = outfits.map(outfit => {
      if (outfit.id === outfitId) {
        return { ...outfit, name: newName.trim() };
      }
      return outfit;
    });
    
    setOutfits(updatedOutfits);
    
    // Toast notification for outfit name change has been removed
    
    return true;
  };

  return {
    findRelatedOutfits,
    createNewOutfit,
    updateOutfitImage,
    handleDeleteOutfit,
    updateOutfitName
  };
}
