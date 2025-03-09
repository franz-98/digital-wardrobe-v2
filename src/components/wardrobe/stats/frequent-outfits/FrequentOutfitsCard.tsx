
import React from 'react';
import { Card } from "@/components/ui/card";
import ExpandableSection from '../ExpandableSection';
import { FrequentOutfitsProps } from './types';
import { useFrequentOutfits } from './useFrequentOutfits';
import OutfitsList from './OutfitsList';

const FrequentOutfitsCard: React.FC<FrequentOutfitsProps> = ({ 
  outfits, 
  timeRange, 
  onOutfitClick 
}) => {
  const frequentlyWornOutfits = useFrequentOutfits(outfits, timeRange);

  return (
    <Card className="p-4">
      <ExpandableSection title="Outfit usati più spesso">
        <OutfitsList 
          frequentlyWornOutfits={frequentlyWornOutfits} 
          onOutfitClick={onOutfitClick} 
        />
      </ExpandableSection>
    </Card>
  );
};

export default FrequentOutfitsCard;
