
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import TimeRangeSelector from './TimeRangeSelector';
import { ClothingItem, Outfit } from './types';
import CategoryDistribution from './stats/CategoryDistribution';
import ColorDistribution from './stats/ColorDistribution';
import OutfitStatistics from './stats/OutfitStatistics';
import FrequentOutfits from './stats/FrequentOutfits';
import FrequentItems from './stats/FrequentItems';

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
        <FrequentOutfits outfits={outfits} />
        <FrequentItems clothingItems={clothingItems} outfits={outfits} />
      </div>
      
      <div className="grid grid-cols-1 gap-4 mb-4">
        <CategoryDistribution clothingItems={clothingItems} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
        <ColorDistribution clothingItems={clothingItems} />
      </div>
      
      <div className="grid grid-cols-1 gap-4 mb-4">
        <OutfitStatistics outfits={outfits} />
      </div>
    </div>
  );
};

export default StatsTab;
