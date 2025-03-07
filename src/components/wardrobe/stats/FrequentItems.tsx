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
}

const FrequentItems: React.FC<FrequentItemsProps> = ({ clothingItems, outfits }) => {
  const [showAllItems, setShowAllItems] = useState(false);
  const DEFAULT_ITEMS_SHOWN = 3;

  // Calculate most frequently used clothing items
  const frequentlyUsedItems = React.useMemo(() => {
    // Create a map to count item usage frequencies
    const itemUsageCounts = new Map<string, number>();
    const itemDates = new Map<string, Date[]>();
    
    // Go through all outfits to track which items are used most often
    outfits.forEach(outfit => {
      outfit.items.forEach(item => {
        // Count this item
        const currentCount = itemUsageCounts.get(item.id) || 0;
        itemUsageCounts.set(item.id, currentCount + 1);
        
        // Store dates to show when the item was worn
        const dates = itemDates.get(item.id) || [];
        
        // Use item's dateTaken if available
        if (item.metadata?.dateTaken) {
          dates.push(new Date(item.metadata.dateTaken));
        }
        // Otherwise use outfit's createdAt as fallback
        else if (outfit.createdAt) {
          dates.push(new Date(outfit.createdAt));
        }
        
        // Sort dates and store
        if (dates.length > 0) {
          dates.sort((a, b) => b.getTime() - a.getTime()); // newest first
          itemDates.set(item.id, dates);
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
  }, [clothingItems, outfits]);

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
              <div key={item.id} className="flex gap-3 items-start">
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
                      {count} {count === 1 ? 'outfit' : 'outfits'}
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
