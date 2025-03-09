
import React from 'react';
import { Outfit, ClothingItem } from './types';
import { OutfitDetailsWrapper } from './outfit-details';

interface OutfitDetailsProps {
  outfit: Outfit;
  onDelete?: (id: string) => void;
  onItemClick?: (item: ClothingItem) => void;
  onImageUpdate?: (outfitId: string, imageUrl: string) => void;
  dismissProgress?: number;
}

// This file is now just a thin wrapper that uses the refactored components
const OutfitDetails = (props: OutfitDetailsProps) => {
  return <OutfitDetailsWrapper {...props} />;
};

export default OutfitDetails;
