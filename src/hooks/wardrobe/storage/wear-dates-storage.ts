
import { loadOutfits, saveOutfits } from './outfit-storage';

/**
 * Save wear dates for a specific outfit
 */
export const saveOutfitWearDates = (outfitId: string, wearDates: Date[]): void => {
  try {
    const allOutfits = loadOutfits();
    
    // If no outfits found, create a minimal outfit entry with this ID
    if (!allOutfits || allOutfits.length === 0) {
      const minimalOutfit = {
        id: outfitId,
        name: "Outfit " + outfitId,
        items: [],
        metadata: {
          wornDates: wearDates.map(date => date.toISOString())
        }
      };
      
      saveOutfits([minimalOutfit]);
      console.log(`Created new outfit entry for ID ${outfitId} with wear dates`);
      return;
    }
    
    // Check if this outfit exists
    const outfitExists = allOutfits.some(outfit => outfit.id === outfitId);
    
    if (!outfitExists) {
      // Create a minimal outfit structure if it doesn't exist
      const minimalOutfit = {
        id: outfitId,
        name: "Outfit " + outfitId,
        items: [],
        metadata: {
          wornDates: wearDates.map(date => date.toISOString())
        }
      };
      
      const updatedOutfits = [...allOutfits, minimalOutfit];
      saveOutfits(updatedOutfits);
      console.log(`Added new outfit entry for ID ${outfitId} with wear dates`);
      return;
    }
    
    // Update existing outfit
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
    
    if (!allOutfits || allOutfits.length === 0) {
      console.log(`No outfits found when trying to load wear dates for outfit ${outfitId}`);
      return [];
    }
    
    const outfit = allOutfits.find(o => o.id === outfitId);
    
    if (outfit?.metadata?.wornDates) {
      return outfit.metadata.wornDates.map(dateStr => new Date(dateStr));
    }
    
    console.log(`No wear dates found for outfit ${outfitId}`);
  } catch (e) {
    console.error(`Failed to load wear dates for outfit ${outfitId}:`, e);
  }
  
  return [];
};

/**
 * Get wear dates for all outfits within a time range
 */
export const getWearDatesInTimeRange = (
  startDate: Date, 
  endDate: Date
): { outfitId: string, dates: Date[] }[] => {
  try {
    const allOutfits = loadOutfits();
    
    if (!allOutfits || allOutfits.length === 0) {
      return [];
    }
    
    return allOutfits
      .filter(outfit => outfit.metadata?.wornDates && outfit.metadata.wornDates.length > 0)
      .map(outfit => {
        const dates = outfit.metadata!.wornDates!
          .map(dateStr => new Date(dateStr))
          .filter(date => date >= startDate && date <= endDate);
        
        return {
          outfitId: outfit.id,
          dates
        };
      })
      .filter(result => result.dates.length > 0);
  } catch (e) {
    console.error("Failed to get wear dates in time range:", e);
    return [];
  }
};
