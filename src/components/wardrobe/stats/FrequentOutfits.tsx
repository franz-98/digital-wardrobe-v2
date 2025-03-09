
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import ExpandableSection from './ExpandableSection';
import { ClothingItem, Outfit } from '../types';

interface OutfitUsage {
  outfit?: Outfit;
  count: number;
  lastWorn: Date | null;
}

interface FrequentOutfitsProps {
  outfits: Outfit[];
  timeRange: string;
  onOutfitClick: (outfit: Outfit) => void;
}

const FrequentOutfits: React.FC<FrequentOutfitsProps> = ({ outfits, timeRange, onOutfitClick }) => {
  const [showAllOutfits, setShowAllOutfits] = useState(false);
  const DEFAULT_OUTFITS_SHOWN = 3;

  // Calculate most frequently worn outfits based on the time range
  const frequentlyWornOutfits = React.useMemo(() => {
    // Filter outfits based on time range
    const filteredOutfits = (() => {
      if (!timeRange || timeRange === "all") return outfits;
      
      const now = new Date();
      let startDate: Date;
      
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
        const endDate = parseCustomDate(endStr);
        
        // If end date is before start date, it might be in the next year
        if (endDate < startDate) {
          endDate.setFullYear(endDate.getFullYear() + 1);
        }
        
        return outfits.filter(outfit => {
          if (!outfit.createdAt) return false;
          const outfitDate = new Date(outfit.createdAt);
          return outfitDate >= startDate && outfitDate <= endDate;
        });
      } else if (timeRange === "week") {
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        
        return outfits.filter(outfit => {
          if (!outfit.createdAt) return false;
          const outfitDate = new Date(outfit.createdAt);
          return outfitDate >= startDate && outfitDate <= now;
        });
      } else if (timeRange === "month") {
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        
        return outfits.filter(outfit => {
          if (!outfit.createdAt) return false;
          const outfitDate = new Date(outfit.createdAt);
          return outfitDate >= startDate && outfitDate <= now;
        });
      } else {
        return outfits;
      }
    })();

    // Create a map to count outfit usage frequencies
    const outfitUsageCounts = new Map<string, number>();
    const outfitDates = new Map<string, Date[]>();
    
    // Count each outfit usage based on metadata.dateTaken
    filteredOutfits.forEach(outfit => {
      // Check for createdAt as fallback
      if (outfit.createdAt || outfit.items.some(item => item.metadata?.dateTaken)) {
        // Count this outfit
        const currentCount = outfitUsageCounts.get(outfit.id) || 0;
        outfitUsageCounts.set(outfit.id, currentCount + 1);
        
        // Store dates to show when the outfit was worn
        const dates = outfitDates.get(outfit.id) || [];
        
        // Check each item for metadata.dateTaken
        outfit.items.forEach(item => {
          if (item.metadata?.dateTaken) {
            dates.push(new Date(item.metadata.dateTaken));
          }
        });
        
        // Use createdAt as a fallback if no dateTaken found
        if (dates.length === 0 && outfit.createdAt) {
          dates.push(new Date(outfit.createdAt));
        }
        
        // Sort dates and store
        dates.sort((a, b) => b.getTime() - a.getTime()); // newest first
        outfitDates.set(outfit.id, dates);
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
      .filter(item => item.outfit !== undefined)
      .sort((a, b) => b.count - a.count);
  }, [outfits, timeRange]);

  // Get displayed outfits based on current state
  const displayedOutfits = showAllOutfits 
    ? frequentlyWornOutfits 
    : frequentlyWornOutfits.slice(0, DEFAULT_OUTFITS_SHOWN);

  return (
    <Card className="p-4">
      <ExpandableSection title="Outfit usati più spesso">
        {frequentlyWornOutfits.length > 0 ? (
          <div className="space-y-4">
            {displayedOutfits.map(({ outfit, count, lastWorn }) => (
              <div 
                key={outfit?.id} 
                className="flex gap-3 items-start hover:bg-muted/40 p-2 rounded-md cursor-pointer transition-colors"
                onClick={() => outfit && onOutfitClick(outfit)}
              >
                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={outfit?.imageUrl || outfit?.items[0]?.imageUrl || "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop"} 
                    alt={outfit?.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{outfit?.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {count} {count === 1 ? 'time' : 'times'}
                    </Badge>
                  </div>
                  {lastWorn && (
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      Last worn: {lastWorn.toLocaleDateString()}
                    </div>
                  )}
                  <div className="flex gap-1 mt-1">
                    {outfit?.items.slice(0, 4).map(item => (
                      <div 
                        key={item.id} 
                        className="w-5 h-5 rounded-sm overflow-hidden border"
                      >
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ))}
                    {(outfit?.items.length || 0) > 4 && (
                      <div className="w-5 h-5 rounded-sm bg-muted flex items-center justify-center text-xs">
                        +{(outfit?.items.length || 0) - 4}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {frequentlyWornOutfits.length > DEFAULT_OUTFITS_SHOWN && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 w-full text-xs"
                onClick={() => setShowAllOutfits(!showAllOutfits)}
              >
                {showAllOutfits 
                  ? "Show less" 
                  : `Show all outfits (${frequentlyWornOutfits.length})`}
              </Button>
            )}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground italic py-4 text-center">
            No outfit usage data available yet
          </div>
        )}
      </ExpandableSection>
    </Card>
  );
};

export default FrequentOutfits;
