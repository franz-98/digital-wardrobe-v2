
import { useToast } from "@/hooks/use-toast";
import { WardrobeActionsProps } from "./types";

export function useItemActions({
  outfits,
  clothingItems,
  setOutfits,
  setClothingItems,
}: Pick<WardrobeActionsProps, "outfits" | "clothingItems" | "setOutfits" | "setClothingItems">) {
  const { toast } = useToast();

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

  const updateItemName = (itemId: string, newName: string) => {
    if (!newName.trim()) {
      toast({
        title: "Invalid name",
        description: "Please enter a valid name for this item.",
        variant: "destructive"
      });
      return false;
    }

    const updatedItems = clothingItems.map(item => {
      if (item.id === itemId) {
        return { ...item, name: newName.trim() };
      }
      return item;
    });
    
    setClothingItems(updatedItems);
    
    const updatedOutfits = outfits.map(outfit => {
      if (outfit.items.some(item => item.id === itemId)) {
        return {
          ...outfit,
          items: outfit.items.map(item => {
            if (item.id === itemId) {
              return { ...item, name: newName.trim() };
            }
            return item;
          })
        };
      }
      return outfit;
    });
    
    setOutfits(updatedOutfits);
    
    toast({
      title: "Item updated",
      description: `The item has been renamed to "${newName.trim()}".`,
    });
    
    return true;
  };

  const updateItemMetadata = (itemId: string, field: string, value: string) => {
    console.log(`Updating item ${itemId}, field: ${field}, value: ${value}`);
    
    if (!value.trim() && field !== "brand") {
      toast({
        title: "Invalid value",
        description: `Please enter a valid ${field} for this item.`,
        variant: "destructive"
      });
      return false;
    }

    const updatedItems = clothingItems.map(item => {
      if (item.id === itemId) {
        console.log("Found item to update:", item.name);
        return { 
          ...item, 
          metadata: {
            ...item.metadata,
            [field]: value.trim() || undefined
          }
        };
      }
      return item;
    });
    
    setClothingItems(updatedItems);
    
    const updatedOutfits = outfits.map(outfit => {
      if (outfit.items.some(item => item.id === itemId)) {
        return {
          ...outfit,
          items: outfit.items.map(item => {
            if (item.id === itemId) {
              return { 
                ...item, 
                metadata: {
                  ...item.metadata,
                  [field]: value.trim() || undefined
                }
              };
            }
            return item;
          })
        };
      }
      return outfit;
    });
    
    setOutfits(updatedOutfits);
    
    toast({
      title: "Item updated",
      description: value.trim() 
        ? `The item's ${field} has been updated to "${value.trim()}".`
        : `The item's ${field} has been removed.`,
    });
    
    return true;
  };

  return {
    handleDeleteItem,
    updateItemName,
    updateItemMetadata
  };
}
