
import React, { useState } from 'react';
import { Shirt } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import ExpandableSection from './ExpandableSection';
import { ClothingItem, Outfit } from '../types';

interface ItemUsage {
  item: ClothingItem;
  count: number;
  lastWorn: Date | null;
}

interface FrequentItemsProps {
  clothingItems: ClothingItem[];
  outfits: Outfit[];
  timeRange: string;
  onItemClick: (item: ClothingItem) => void;
}

const FrequentItems: React.FC<FrequentItemsProps> = ({ clothingItems, outfits, timeRange, onItemClick }) => {
  const [showAllItems, setShowAllItems] = useState(false);
  const DEFAULT_ITEMS_SHOWN = 3;

  // Filter outfits based on time range and prepare item usage data
  const frequentlyUsedItems = React.useMemo(() => {
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

  // Get displayed items based on current state
  const displayedItems = showAllItems 
    ? frequentlyUsedItems 
    : frequentlyUsedItems.slice(0, DEFAULT_ITEMS_SHOWN);

  return (
    <Card className="p-4">
      <ExpandableSection title="Indumenti usati più spesso">
        {frequentlyUsedItems.length > 0 ? (
          <div className="space-y-4">
            {displayedItems.map(({ item, count, lastWorn }) => (
              <div 
                key={item.id} 
                className="flex gap-3 items-start hover:bg-muted/40 p-2 rounded-md cursor-pointer transition-colors"
                onClick={() => onItemClick(item)}
              >
                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={item.imageUrl || "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop"} 
                    alt={item.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {count} {count === 1 ? 'time' : 'times'}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {item.category}
                    {item.metadata?.brand && ` • ${item.metadata.brand}`}
                  </div>
                  {lastWorn && (
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Shirt className="h-3 w-3 mr-1" />
                      Last worn: {lastWorn.toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {frequentlyUsedItems.length > DEFAULT_ITEMS_SHOWN && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 w-full text-xs"
                onClick={() => setShowAllItems(!showAllItems)}
              >
                {showAllItems 
                  ? "Show less" 
                  : `Show all items (${frequentlyUsedItems.length})`}
              </Button>
            )}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground italic py-4 text-center">
            No clothing item usage data available yet
          </div>
        )}
      </ExpandableSection>
    </Card>
  );
};

export default FrequentItems;
