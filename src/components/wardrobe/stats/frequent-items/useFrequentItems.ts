
import React from 'react';
import { ClothingItem, Outfit } from '../../types';
import { ItemUsage } from './types';

export const useFrequentItems = (clothingItems: ClothingItem[], outfits: Outfit[], timeRange: string) => {
  // Filter outfits based on time range and prepare item usage data
  return React.useMemo(() => {
    // Filter outfits based on time range
    const filteredOutfits = (() => {
      if (!timeRange || timeRange === "all") return outfits;
      
      const now = new Date();
      let startDate: Date;
      let endDate: Date = new Date(now);
      
      // Parse custom date range
      if (timeRange.includes(" - ")) {
        const [startStr, endStr] = timeRange.split(" - ");
        // This is a simplified approach, using regex to handle MMM d format
        const parseCustomDate = (dateStr: string) => {
          const months: Record<string, number> = {
            'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
            'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
          };
          const match = dateStr.match(/([A-Za-z]{3})\s+(\d+)/);
          if (match) {
            const month = months[match[1]];
            const day = parseInt(match[2]);
            const date = new Date();
            date.setMonth(month);
            date.setDate(day);
            return date;
          }
          return new Date(now);
        };
        
        startDate = parseCustomDate(startStr);
        endDate = parseCustomDate(endStr);
        
        // If end date is before start date, it might be in the next year
        if (endDate < startDate) {
          endDate.setFullYear(endDate.getFullYear() + 1);
        }
      } else if (timeRange === "week") {
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
      } else if (timeRange === "month") {
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
      } else {
        return outfits;
      }
      
      return outfits.filter(outfit => {
        // Check for wear history dates in the range
        if (outfit.metadata?.wornDates && outfit.metadata.wornDates.length > 0) {
          return outfit.metadata.wornDates.some(dateStr => {
            const wornDate = new Date(dateStr);
            return wornDate >= startDate && wornDate <= endDate;
          });
        }
        
        // Fall back to created date if no wear dates
        if (!outfit.createdAt) return false;
        const outfitDate = new Date(outfit.createdAt);
        return outfitDate >= startDate && outfitDate <= endDate;
      });
    })();

    // Create a map to count item usage frequencies
    const itemUsageCounts = new Map<string, number>();
    const itemDates = new Map<string, Date[]>();
    
    // Go through all outfits to track which items are used most often
    filteredOutfits.forEach(outfit => {
      // Get wear dates from outfit metadata
      const outfitWearDates: Date[] = [];
      if (outfit.metadata?.wornDates && outfit.metadata.wornDates.length > 0) {
        outfit.metadata.wornDates.forEach(dateStr => {
          outfitWearDates.push(new Date(dateStr));
        });
      } else if (outfit.createdAt) {
        outfitWearDates.push(new Date(outfit.createdAt));
      }
      
      // Count each item for each time the outfit was worn
      outfit.items.forEach(item => {
        // Get current count for this item
        const currentCount = itemUsageCounts.get(item.id) || 0;
        // Add to count - if outfit has wear dates, use that count, otherwise add 1
        const addCount = outfitWearDates.length || 1;
        itemUsageCounts.set(item.id, currentCount + addCount);
        
        // Store dates to show when the item was worn
        const existingDates = itemDates.get(item.id) || [];
        const allDates = [...existingDates, ...outfitWearDates];
        
        // Also consider item-specific dates if available
        if (item.metadata?.dateTaken) {
          allDates.push(new Date(item.metadata.dateTaken));
        }
        
        // Sort dates and store unique ones
        if (allDates.length > 0) {
          // Sort newest first and remove duplicates
          const uniqueDates = Array.from(new Set(
            allDates.map(date => date.getTime())
          )).map(time => new Date(time))
            .sort((a, b) => b.getTime() - a.getTime());
            
          itemDates.set(item.id, uniqueDates);
        }
      });
    });
    
    // Convert to array and sort by frequency
    return Array.from(itemUsageCounts.entries())
      .map(([itemId, count]) => {
        const item = clothingItems.find(item => item.id === itemId);
        const dates = itemDates.get(itemId) || [];
        
        return {
          item,
          count,
          lastWorn: dates.length > 0 ? dates[0] : null
        };
      })
      .filter(usage => usage.item !== undefined)
      .sort((a, b) => b.count - a.count);
  }, [clothingItems, outfits, timeRange]);
};
