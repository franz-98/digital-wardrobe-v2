
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import ExpandableSection from './ExpandableSection';
import { ClothingItem, Outfit } from '../types';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { colorNameToHex } from '../utils/colorUtils';

interface MostUsedColorsProps {
  clothingItems: ClothingItem[];
  outfits: Outfit[];
  timeRange: string;
}

interface ColorUsage {
  color: string;
  count: number;
  percentage: number;
}

const MostUsedColors: React.FC<MostUsedColorsProps> = ({ 
  clothingItems, 
  outfits,
  timeRange 
}) => {
  const [showAllColors, setShowAllColors] = useState(false);
  const DEFAULT_COLORS_SHOWN = 8;

  // Filter outfits based on time range
  const filteredOutfits = React.useMemo(() => {
    if (!timeRange || timeRange === "all") return outfits;
    
    const now = new Date();
    let startDate: Date;
    
    // Parse custom date range
    if (timeRange.includes("-")) {
      const [startStr, endStr] = timeRange.split(" - ");
      // This is a simplified approach, in a real app we'd use a more robust date parsing
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 30); // Default to last 30 days for custom range
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
      if (!outfit.createdAt) return false;
      const outfitDate = new Date(outfit.createdAt);
      return outfitDate >= startDate && outfitDate <= now;
    });
  }, [outfits, timeRange]);

  // Calculate most used colors from outfits in the selected time range
  const colorUsageStats: ColorUsage[] = React.useMemo(() => {
    const colorCounts: Record<string, number> = {};
    let totalUsage = 0;
    
    // Count color occurrences from outfits in the time range
    filteredOutfits.forEach(outfit => {
      outfit.items.forEach(item => {
        if (item.color) {
          colorCounts[item.color] = (colorCounts[item.color] || 0) + 1;
          totalUsage++;
        }
      });
    });
    
    // Convert to percentages and sort by usage (descending)
    return Object.entries(colorCounts)
      .map(([color, count]) => ({
        color,
        count,
        percentage: totalUsage > 0 ? Math.round((count / totalUsage) * 100) : 0
      }))
      .sort((a, b) => b.count - a.count);
  }, [filteredOutfits]);

  // Get displayed colors based on current state
  const displayedColors = showAllColors 
    ? colorUsageStats 
    : colorUsageStats.slice(0, DEFAULT_COLORS_SHOWN);

  return (
    <Card className="p-4">
      <ExpandableSection title="Colori usati più spesso">
        <div className="space-y-3">
          {displayedColors.length > 0 ? (
            displayedColors.map(({ color, count, percentage }) => {
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
              
              const hexColor = colorNameToHex(color);
              
              return (
                <div key={color} className="mb-2">
                  <div className="flex justify-between items-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="flex items-center cursor-pointer">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ 
                              backgroundColor: bgColor, 
                              border: displayColor === 'white' ? '1px solid #ddd' : 'none' 
                            }}
                          ></div>
                          <span className="text-sm">{color}</span>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-2">
                        <div className="space-y-1">
                          <p className="text-xs font-medium">{color}</p>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded-full border border-border/50"
                              style={{ backgroundColor: hexColor }}
                            />
                            <code className="text-xs bg-muted px-1 py-0.5 rounded">{hexColor}</code>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">{count} uses</span>
                      <span className="font-medium text-sm">{percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden mt-1">
                    <div className="h-full rounded-full" style={{ 
                      width: `${percentage}%`,
                      backgroundColor: bgColor,
                      border: displayColor === 'white' ? '1px solid #ddd' : 'none'
                    }}></div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-sm text-muted-foreground italic">
              No color usage data available for this time period
            </div>
          )}
          
          {colorUsageStats.length > DEFAULT_COLORS_SHOWN && (
            <button 
              className="mt-2 w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
              onClick={() => setShowAllColors(!showAllColors)}
            >
              {showAllColors 
                ? "Show less" 
                : `Show all colors (${colorUsageStats.length})`}
            </button>
          )}
        </div>
      </ExpandableSection>
    </Card>
  );
};

export default MostUsedColors;
