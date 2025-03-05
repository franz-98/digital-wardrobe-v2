
import { useToast } from "@/hooks/use-toast";
import { ClothingItem, Outfit } from "@/components/wardrobe/types";

interface WardrobeActionsProps {
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

export function useWardrobeActions({
  outfits,
  clothingItems,
  setOutfits,
  setClothingItems,
  selectedItemsForOutfit,
  newOutfitName,
  setNewOutfitName,
  setSelectedItemsForOutfit,
  setIsCreatingOutfit,
  isPremium,
  setIsPremium
}: WardrobeActionsProps) {
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

  const handleDeleteItem = (itemId: string) => {
    const updatedItems = clothingItems.filter(item => item.id !== itemId);
    setClothingItems(updatedItems);
    
    const updatedOutfits = outfits.map(outfit => {
      if (outfit.items.some(item => item.id === itemId)) {
        return {
          ...outfit,
          items: outfit.items.filter(item => item.id !== itemId)
        };
      }
      return outfit;
    });
    setOutfits(updatedOutfits);
    
    toast({
      title: "Item deleted",
      description: "The clothing item has been removed from your wardrobe.",
    });
  };
  
  const handleDeleteOutfit = (outfitId: string) => {
    const updatedOutfits = outfits.filter(outfit => outfit.id !== outfitId);
    setOutfits(updatedOutfits);
    
    toast({
      title: "Outfit deleted",
      description: "The outfit has been removed from your wardrobe.",
    });
  };

  const togglePremium = () => {
    setIsPremium(!isPremium);
    toast({
      title: isPremium ? "Premium disabled" : "Premium enabled",
      description: isPremium 
        ? "You no longer have access to premium features" 
        : "You now have access to all premium features",
    });
  };

  const updateStatsForTimeRange = (range: string) => {
    console.log(`Updating stats for time range: ${range}`);
  };

  const updateStatsForCustomRange = (start: Date, end: Date) => {
    console.log(`Updating stats for custom range: ${start.toISOString()} to ${end.toISOString()}`);
  };

  return {
    findRelatedOutfits,
    createNewOutfit,
    updateOutfitImage,
    handleDeleteItem,
    handleDeleteOutfit,
    togglePremium,
    updateStatsForTimeRange,
    updateStatsForCustomRange
  };
}
