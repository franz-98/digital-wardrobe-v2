
import React from 'react';
import { Card } from "@/components/ui/card";
import ExpandableSection from './ExpandableSection';
import { Outfit } from '../types';

interface OutfitStatisticsProps {
  outfits: Outfit[];
}

const OutfitStatistics: React.FC<OutfitStatisticsProps> = ({ outfits }) => {
  // Get outfit stats
  const outfitStats = React.useMemo(() => {
    return {
      total: outfits.length,
      averageItems: outfits.length > 0 
        ? Math.round(outfits.reduce((sum, outfit) => sum + outfit.items.length, 0) / outfits.length) 
        : 0
    };
  }, [outfits]);

  return (
    <Card className="p-4">
      <ExpandableSection title="Outfit Statistics">
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
      </ExpandableSection>
    </Card>
  );
};

export default OutfitStatistics;
