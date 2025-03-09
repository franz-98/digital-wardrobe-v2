
import { useState, useEffect } from 'react';
import { Outfit } from '@/components/wardrobe/types';
import { OutfitUsage } from './types';
import { 
  getWearDatesInTimeRange, 
  calculateTimeRangeDates,
  loadOutfitWearDates
} from '@/hooks/wardrobe/storage';

export const useFrequentOutfits = (outfits: Outfit[], timeRange: string): OutfitUsage[] => {
  const [frequentOutfits, setFrequentOutfits] = useState<OutfitUsage[]>([]);

  useEffect(() => {
    // Calculate date range from timeRange string
    const { start, end } = calculateTimeRangeDates(timeRange);
    
    // Get all wear dates within the time range
    const wearDatesInRange = getWearDatesInTimeRange(start, end);
    
    // Map to count occurrences for each outfit
    const outfitUsages: OutfitUsage[] = outfits
      .filter(outfit => {
        // Only include outfits that have been worn in this time range
        const wearData = wearDatesInRange.find(data => data.outfitId === outfit.id);
        return wearData && wearData.dates.length > 0;
      })
      .map(outfit => {
        // Find this outfit's wear dates
        const wearData = wearDatesInRange.find(data => data.outfitId === outfit.id);
        const wearDates = wearData ? wearData.dates : [];
        
        // Sort dates descending to find the most recent
        const sortedDates = [...wearDates].sort((a, b) => b.getTime() - a.getTime());
        
        return {
          outfit,
          count: wearDates.length,
          lastWorn: sortedDates.length > 0 ? sortedDates[0] : null
        };
      })
      .sort((a, b) => b.count - a.count); // Sort by most frequently worn
    
    setFrequentOutfits(outfitUsages);
  }, [outfits, timeRange]);

  return frequentOutfits;
};
