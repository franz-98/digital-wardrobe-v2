
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ExpandableSection from './ExpandableSection';
import { ClothingItem } from '../types';

interface CategoryStat {
  category: string;
  count: number;
  percentage: number;
}

interface CategoryDistributionProps {
  clothingItems: ClothingItem[];
}

const CategoryDistribution: React.FC<CategoryDistributionProps> = ({ clothingItems }) => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const DEFAULT_CATEGORIES_SHOWN = 5;

  // Calculate category distribution
  const categoryStats: CategoryStat[] = React.useMemo(() => {
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

  // Get displayed categories based on current state
  const displayedCategories = showAllCategories 
    ? categoryStats 
    : categoryStats.slice(0, DEFAULT_CATEGORIES_SHOWN);

  return (
    <Card className="p-4">
      <ExpandableSection title="Wardrobe Composition">
        <div className="space-y-3">
          {displayedCategories.map(({ category, percentage }) => (
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
          
          {categoryStats.length > DEFAULT_CATEGORIES_SHOWN && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2 w-full text-xs"
              onClick={() => setShowAllCategories(!showAllCategories)}
            >
              {showAllCategories 
                ? "Show less" 
                : `Show all (${categoryStats.length})`}
            </Button>
          )}
        </div>
      </ExpandableSection>
    </Card>
  );
};

export default CategoryDistribution;
