
import React, { useMemo } from 'react';
import { Search, Calendar } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TimeRangeSelector from './TimeRangeSelector';
import { ClothingItem, Outfit } from '../wardrobe/types';

interface StatsTabProps {
  timeRange: string;
  setTimeRange: (range: string) => void;
  updateStatsForTimeRange: (range: string) => void;
  updateStatsForCustomRange: (start: Date, end: Date) => void;
  clothingItems: ClothingItem[];
  outfits: Outfit[];
}

const StatsTab = ({
  timeRange,
  setTimeRange,
  updateStatsForTimeRange,
  updateStatsForCustomRange,
  clothingItems,
  outfits
}: StatsTabProps) => {
  // Calculate category distribution
  const categoryStats = useMemo(() => {
    const categories: Record<string, number> = {};
    let total = 0;
    
    clothingItems.forEach(item => {
      const category = item.category || 'Unknown';
      categories[category] = (categories[category] || 0) + 1;
      total++;
    });
    
    // Convert to percentages and sort by value (descending)
    return Object.entries(categories)
      .map(([category, count]) => ({
        category,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0
      }))
      .sort((a, b) => b.percentage - a.percentage);
  }, [clothingItems]);
  
  // Calculate color distribution
  const colorStats = useMemo(() => {
    const colors: Record<string, number> = {};
    let total = 0;
    
    clothingItems.forEach(item => {
      const color = item.color || 'Unknown';
      colors[color] = (colors[color] || 0) + 1;
      total++;
    });
    
    // Convert to percentages and sort by value (descending)
    return Object.entries(colors)
      .map(([color, count]) => ({
        color,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5); // Take top 5 colors
  }, [clothingItems]);
  
  // Get outfit stats
  const outfitStats = useMemo(() => {
    return {
      total: outfits.length,
      averageItems: outfits.length > 0 
        ? Math.round(outfits.reduce((sum, outfit) => sum + outfit.items.length, 0) / outfits.length) 
        : 0
    };
  }, [outfits]);

  // Calculate most frequently worn outfits
  const frequentlyWornOutfits = useMemo(() => {
    // Create a map to count outfit usage frequencies
    const outfitUsageCounts = new Map<string, number>();
    const outfitDates = new Map<string, Date[]>();
    
    // Count each outfit usage based on metadata.dateTaken
    outfits.forEach(outfit => {
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
      .sort((a, b) => b.count - a.count)
      .slice(0, 3); // Take top 3 most frequently worn outfits
  }, [outfits]);

  return (
    <div className="pb-20">
      <div className="flex justify-between mb-2">
        <Button variant="ghost" size="icon" className="h-10 w-10">
          <Search className="h-5 w-5" />
        </Button>
        <TimeRangeSelector 
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          updateStatsForTimeRange={updateStatsForTimeRange}
          updateStatsForCustomRange={updateStatsForCustomRange}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card className="p-4">
          <h3 className="text-base font-medium mb-4">Wardrobe Composition</h3>
          <div className="space-y-3">
            {categoryStats.map(({ category, percentage }) => (
              <div key={category}>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{category}</span>
                  <span className="font-medium text-sm">{percentage}%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${percentage}%` }}></div>
                </div>
              </div>
            ))}
            
            {categoryStats.length === 0 && (
              <div className="text-sm text-muted-foreground italic">
                No clothing items found
              </div>
            )}
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-base font-medium mb-4">Color Distribution</h3>
          <div className="space-y-3">
            {colorStats.map(({ color, percentage }) => {
              const displayColor = color.toLowerCase();
              const isStandardColor = [
                'red', 'blue', 'green', 'yellow', 'purple', 
                'pink', 'orange', 'brown', 'gray', 'black', 'white'
              ].includes(displayColor);
              
              // Assign a CSS color based on the color name
              let bgColor = displayColor;
              if (!isStandardColor) {
                // For non-standard colors, assign a default color
                bgColor = displayColor === 'navy' ? 'darkblue' : 
                          displayColor === 'beige' ? '#f5f5dc' :
                          displayColor === 'teal' ? '#008080' :
                          displayColor === 'maroon' ? '#800000' :
                          displayColor === 'olive' ? '#808000' : '#777777';
              }
              
              return (
                <div key={color}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ 
                          backgroundColor: bgColor, 
                          border: displayColor === 'white' ? '1px solid #ddd' : 'none' 
                        }}
                      ></div>
                      <span className="text-sm">{color}</span>
                    </div>
                    <span className="font-medium text-sm">{percentage}%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ 
                      width: `${percentage}%`,
                      backgroundColor: bgColor,
                      border: displayColor === 'white' ? '1px solid #ddd' : 'none'
                    }}></div>
                  </div>
                </div>
              );
            })}
            
            {colorStats.length === 0 && (
              <div className="text-sm text-muted-foreground italic">
                No colors data available
              </div>
            )}
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-4 mb-4">
        <Card className="p-4">
          <h3 className="text-base font-medium mb-4">Outfit Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center p-4 bg-secondary/20 rounded-lg">
              <span className="text-3xl font-bold">{outfitStats.total}</span>
              <span className="text-sm text-muted-foreground">Total Outfits</span>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 bg-secondary/20 rounded-lg">
              <span className="text-3xl font-bold">{outfitStats.averageItems}</span>
              <span className="text-sm text-muted-foreground">Avg. Items per Outfit</span>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-4 mb-4">
        <Card className="p-4">
          <h3 className="text-base font-medium mb-4">Outfit usati più spesso</h3>
          {frequentlyWornOutfits.length > 0 ? (
            <div className="space-y-4">
              {frequentlyWornOutfits.map(({ outfit, count, lastWorn }) => (
                <div key={outfit?.id} className="flex gap-3 items-start">
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
            </div>
          ) : (
            <div className="text-sm text-muted-foreground italic py-4 text-center">
              No outfit usage data available yet
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default StatsTab;
