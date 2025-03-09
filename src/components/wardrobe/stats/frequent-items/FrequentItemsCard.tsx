
import React from 'react';
import { Card } from "@/components/ui/card";
import ExpandableSection from '../ExpandableSection';
import { FrequentItemsProps } from './types';
import { useFrequentItems } from './useFrequentItems';
import ItemsList from './ItemsList';

const FrequentItemsCard: React.FC<FrequentItemsProps> = ({ 
  clothingItems, 
  outfits, 
  timeRange, 
  onItemClick 
}) => {
  const frequentlyUsedItems = useFrequentItems(clothingItems, outfits, timeRange);

  return (
    <Card className="p-4">
      <ExpandableSection title="Indumenti usati più spesso">
        <ItemsList 
          frequentlyUsedItems={frequentlyUsedItems} 
          onItemClick={onItemClick} 
        />
      </ExpandableSection>
    </Card>
  );
};

export default FrequentItemsCard;
