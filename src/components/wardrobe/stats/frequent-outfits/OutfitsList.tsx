
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Outfit } from '../../types';
import { OutfitUsage } from './types';
import OutfitCard from './OutfitCard';

interface OutfitsListProps {
  frequentlyWornOutfits: OutfitUsage[];
  onOutfitClick: (outfit: Outfit) => void;
}

const OutfitsList: React.FC<OutfitsListProps> = ({ 
  frequentlyWornOutfits, 
  onOutfitClick 
}) => {
  const [showAllOutfits, setShowAllOutfits] = useState(false);
  const DEFAULT_OUTFITS_SHOWN = 3;

  // Get displayed outfits based on current state
  const displayedOutfits = showAllOutfits 
    ? frequentlyWornOutfits 
    : frequentlyWornOutfits.slice(0, DEFAULT_OUTFITS_SHOWN);

  if (frequentlyWornOutfits.length === 0) {
    return (
      <div className="text-sm text-muted-foreground italic py-4 text-center">
        No outfit usage data available yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {displayedOutfits.map((outfitUsage) => (
        <OutfitCard 
          key={outfitUsage.outfit.id} 
          outfitUsage={outfitUsage} 
          onClick={onOutfitClick} 
        />
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
  );
};

export default OutfitsList;
