
import { ClothingItem, Outfit } from '../../types';

export interface ItemUsage {
  item: ClothingItem;
  count: number;
  lastWorn: Date | null;
}

export interface FrequentItemsProps {
  clothingItems: ClothingItem[];
  outfits: Outfit[];
  timeRange: string;
  onItemClick: (item: ClothingItem) => void;
}
