
import { Outfit } from '../../types';

export interface OutfitUsage {
  outfit: Outfit;
  count: number;
  lastWorn: Date | null;
}

export interface FrequentOutfitsProps {
  outfits: Outfit[];
  timeRange: string;
  onOutfitClick: (outfit: Outfit) => void;
}
