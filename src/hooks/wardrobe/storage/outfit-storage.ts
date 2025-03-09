
import { Outfit } from "@/components/wardrobe/types";

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
