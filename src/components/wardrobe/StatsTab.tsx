import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { TimeRangeSelector } from './time-range';
import { ClothingItem, Outfit } from './types';
import CategoryDistribution from './stats/CategoryDistribution';
import ColorDistribution from './stats/ColorDistribution';
import OutfitStatistics from './stats/OutfitStatistics';
import FrequentOutfits from './stats/frequent-outfits';
import FrequentItems from './stats/frequent-items';
import MostUsedColors from './stats/MostUsedColors';

interface StatsTabProps {
  timeRange: string;
  setTimeRange: (range: string) => void;
  updateStatsForTimeRange: (range: string) => void;
  updateStatsForCustomRange: (start: Date, end: Date) => void;
  clothingItems: ClothingItem[];
  outfits: Outfit[];
  handleItemClick: (item: ClothingItem) => void;
  handleOutfitClick: (outfit: Outfit) => void;
}

const StatsTab = ({
  timeRange,
  setTimeRange,
  updateStatsForTimeRange,
  updateStatsForCustomRange,
  clothingItems,
  outfits,
  handleItemClick,
  handleOutfitClick
}: StatsTabProps) => {
  const [updateCounter, setUpdateCounter] = useState(0);
  
  useEffect(() => {
    const handleWardrobeUpdate = () => {
      console.log("Stats tab detected wardrobe update, refreshing...");
      setUpdateCounter(prev => prev + 1);
    };
    
    window.addEventListener('wardrobe-update', handleWardrobeUpdate);
    
    return () => {
      window.removeEventListener('wardrobe-update', handleWardrobeUpdate);
    };
  }, []);
  
  useEffect(() => {
    updateStatsForTimeRange(timeRange);
  }, [timeRange, updateStatsForTimeRange, updateCounter]);

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
        <FrequentOutfits 
          outfits={outfits} 
          timeRange={timeRange} 
          onOutfitClick={handleOutfitClick}
          key={`frequent-outfits-${timeRange}-${updateCounter}`}
        />
        <FrequentItems 
          clothingItems={clothingItems} 
          outfits={outfits} 
          timeRange={timeRange} 
          onItemClick={handleItemClick}
          key={`frequent-items-${timeRange}-${updateCounter}`}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-4 mb-4">
        <MostUsedColors 
          clothingItems={clothingItems} 
          outfits={outfits} 
          timeRange={timeRange}
          key={`most-used-colors-${timeRange}-${updateCounter}`}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-4 mb-4">
        <CategoryDistribution 
          clothingItems={clothingItems}
          key={`category-distribution-${updateCounter}`}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
        <ColorDistribution 
          clothingItems={clothingItems}
          key={`color-distribution-${updateCounter}`}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-4 mb-4">
        <OutfitStatistics 
          outfits={outfits}
          key={`outfit-statistics-${updateCounter}`}
        />
      </div>
    </div>
  );
};

export default StatsTab;
