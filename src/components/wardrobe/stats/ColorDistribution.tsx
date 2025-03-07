
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ExpandableSection from './ExpandableSection';
import { ClothingItem } from '../types';

interface ColorStat {
  color: string;
  count: number;
  percentage: number;
}

interface ColorDistributionProps {
  clothingItems: ClothingItem[];
}

const ColorDistribution: React.FC<ColorDistributionProps> = ({ clothingItems }) => {
  const [showAllColors, setShowAllColors] = useState(false);
  const DEFAULT_COLORS_SHOWN = 5;

  // Calculate color distribution
  const colorStats: ColorStat[] = React.useMemo(() => {
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
      .sort((a, b) => b.percentage - a.percentage);
  }, [clothingItems]);

  // Get displayed colors based on current state
  const displayedColors = showAllColors 
    ? colorStats 
    : colorStats.slice(0, DEFAULT_COLORS_SHOWN);

  return (
    <Card className="p-4">
      <ExpandableSection title="Color Distribution">
        <div className="space-y-3">
          {displayedColors.map(({ color, percentage }) => {
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
          
          {colorStats.length > DEFAULT_COLORS_SHOWN && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2 w-full text-xs"
              onClick={() => setShowAllColors(!showAllColors)}
            >
              {showAllColors 
                ? "Show less" 
                : `Show all colors (${colorStats.length})`}
            </Button>
          )}
        </div>
      </ExpandableSection>
    </Card>
  );
};

export default ColorDistribution;
