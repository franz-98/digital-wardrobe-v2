
import React from 'react';
import { Outfit } from '../../types';
import { OutfitUsage } from './types';

export const useFrequentOutfits = (outfits: Outfit[], timeRange: string) => {
  // Calculate most frequently worn outfits based on the time range
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
        // Check for wear history dates within the range
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

    // Create a map to count outfit usage frequencies and track wear dates
    const outfitUsageCounts = new Map<string, number>();
    const outfitDates = new Map<string, Date[]>();
    
    // Process each outfit
    filteredOutfits.forEach(outfit => {
      // Get all wear dates from metadata
      const wearDates: Date[] = [];
      
      if (outfit.metadata?.wornDates && outfit.metadata.wornDates.length > 0) {
        outfit.metadata.wornDates.forEach(dateStr => {
          wearDates.push(new Date(dateStr));
        });
      } else {
        // Fall back to createdAt if no wear dates
        if (outfit.createdAt) {
          wearDates.push(new Date(outfit.createdAt));
        }
        
        // Check items for dates as another fallback
        outfit.items.forEach(item => {
          if (item.metadata?.dateTaken) {
            wearDates.push(new Date(item.metadata.dateTaken));
          }
        });
      }
      
      if (wearDates.length > 0) {
        // Count this outfit based on number of times worn
        outfitUsageCounts.set(outfit.id, wearDates.length);
        
        // Sort dates and store
        wearDates.sort((a, b) => b.getTime() - a.getTime()); // newest first
        outfitDates.set(outfit.id, wearDates);
      } else {
        // Default count of 1 if no dates found
        outfitUsageCounts.set(outfit.id, 1);
      }
    });
    
    // Convert to array and sort by frequency
    return Array.from(outfitUsageCounts.entries())
      .map(([outfitId, count]) => {
        const outfit = outfits.find(o => o.id === outfitId);
        const dates = outfitDates.get(outfitId) || [];
        
        return {
          outfit,
          count,
          lastWorn: dates.length > 0 ? dates[0] : null
        };
      })
      .filter(item => item.outfit !== undefined) as OutfitUsage[];
  }, [outfits, timeRange]);
};
