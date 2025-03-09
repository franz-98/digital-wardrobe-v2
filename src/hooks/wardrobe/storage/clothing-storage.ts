
import { ClothingItem } from "@/components/wardrobe/types";

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
