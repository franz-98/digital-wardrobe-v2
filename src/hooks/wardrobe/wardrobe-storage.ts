
import { ClothingItem, Outfit } from "@/components/wardrobe/types";

/**
 * Load clothing items from localStorage
 */
export const loadClothingItems = (): ClothingItem[] => {
  try {
    const savedItems = localStorage.getItem('wardrobeClothingItems');
    if (savedItems) {
      return JSON.parse(savedItems);
    }
  } catch (e) {
    console.error("Failed to load clothing items from localStorage:", e);
  }
  
  // Return default items if nothing in localStorage
  return [];
};

/**
 * Save clothing items to localStorage
 */
export const saveClothingItems = (items: ClothingItem[]): void => {
  try {
    localStorage.setItem('wardrobeClothingItems', JSON.stringify(items));
    console.log("Saved clothing items to localStorage:", items.length, "items");
  } catch (e) {
    console.error("Failed to save clothing items to localStorage:", e);
  }
};

/**
 * Load outfits from localStorage
 */
export const loadOutfits = (): Outfit[] => {
  try {
    const savedOutfits = localStorage.getItem('wardrobeOutfits');
    if (savedOutfits) {
      return JSON.parse(savedOutfits);
    }
  } catch (e) {
    console.error("Failed to load outfits from localStorage:", e);
  }
  
  // Return empty array if nothing in localStorage
  return [];
};

/**
 * Save outfits to localStorage
 */
export const saveOutfits = (outfits: Outfit[]): void => {
  try {
    localStorage.setItem('wardrobeOutfits', JSON.stringify(outfits));
    console.log("Saved outfits to localStorage:", outfits.length, "outfits");
  } catch (e) {
    console.error("Failed to save outfits to localStorage:", e);
  }
};

/**
 * Save wear dates for a specific outfit
 */
export const saveOutfitWearDates = (outfitId: string, wearDates: Date[]): void => {
  try {
    const allOutfits = loadOutfits();
    
    const updatedOutfits = allOutfits.map(outfit => {
      if (outfit.id === outfitId) {
        // Create metadata object if it doesn't exist
        const metadata = outfit.metadata || {};
        
        // Save dates as ISO strings
        metadata.wornDates = wearDates.map(date => date.toISOString());
        
        return { ...outfit, metadata };
      }
      return outfit;
    });
    
    saveOutfits(updatedOutfits);
    console.log(`Saved wear dates for outfit ${outfitId}:`, wearDates.length, "dates");
  } catch (e) {
    console.error(`Failed to save wear dates for outfit ${outfitId}:`, e);
  }
};

/**
 * Load wear dates for a specific outfit
 */
export const loadOutfitWearDates = (outfitId: string): Date[] => {
  try {
    const allOutfits = loadOutfits();
    const outfit = allOutfits.find(o => o.id === outfitId);
    
    if (outfit?.metadata?.wornDates) {
      return outfit.metadata.wornDates.map(dateStr => new Date(dateStr));
    }
  } catch (e) {
    console.error(`Failed to load wear dates for outfit ${outfitId}:`, e);
  }
  
  return [];
};
