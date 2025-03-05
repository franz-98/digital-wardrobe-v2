
import { RecentUpload } from "./types";
import { STORAGE_KEYS, DEFAULT_RECENT_UPLOADS } from "./types";

/**
 * Load recent uploads from localStorage
 */
export const loadRecentUploads = (): RecentUpload[] => {
  try {
    const savedItems = localStorage.getItem(STORAGE_KEYS.RECENT_UPLOADS);
    if (savedItems) {
      return JSON.parse(savedItems);
    }
  } catch (e) {
    console.error("Failed to load recent uploads from localStorage:", e);
  }
  
  // Return default items if nothing in localStorage
  return DEFAULT_RECENT_UPLOADS;
};

/**
 * Save recent uploads to localStorage
 */
export const saveRecentUploads = (items: RecentUpload[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.RECENT_UPLOADS, JSON.stringify(items));
    console.log("Saved recent uploads to localStorage:", items.length, "items");
  } catch (e) {
    console.error("Failed to save recent uploads to localStorage:", e);
  }
};
