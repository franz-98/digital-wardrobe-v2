
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ClothingItem } from '../../types';
import { ItemUsage } from './types';
import ItemCard from './ItemCard';

interface ItemsListProps {
  frequentlyUsedItems: ItemUsage[];
  onItemClick: (item: ClothingItem) => void;
}

const ItemsList: React.FC<ItemsListProps> = ({ frequentlyUsedItems, onItemClick }) => {
  const [showAllItems, setShowAllItems] = useState(false);
  const DEFAULT_ITEMS_SHOWN = 3;

  // Get displayed items based on current state
  const displayedItems = showAllItems 
    ? frequentlyUsedItems 
    : frequentlyUsedItems.slice(0, DEFAULT_ITEMS_SHOWN);

  if (frequentlyUsedItems.length === 0) {
    return (
      <div className="text-sm text-muted-foreground italic py-4 text-center">
        No clothing item usage data available yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {displayedItems.map((itemUsage) => (
        <ItemCard 
          key={itemUsage.item.id} 
          itemUsage={itemUsage} 
          onClick={onItemClick} 
        />
      ))}
      
      {frequentlyUsedItems.length > DEFAULT_ITEMS_SHOWN && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-2 w-full text-xs"
          onClick={() => setShowAllItems(!showAllItems)}
        >
          {showAllItems 
            ? "Show less" 
            : `Show all items (${frequentlyUsedItems.length})`}
        </Button>
      )}
    </div>
  );
};

export default ItemsList;
