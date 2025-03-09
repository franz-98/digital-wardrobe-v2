
import React from 'react';
import { Shirt } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { ClothingItem } from '../../types';
import { ItemUsage } from './types';

interface ItemCardProps {
  itemUsage: ItemUsage;
  onClick: (item: ClothingItem) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ itemUsage, onClick }) => {
  const { item, count, lastWorn } = itemUsage;

  return (
    <div 
      className="flex gap-3 items-start hover:bg-muted/40 p-2 rounded-md cursor-pointer transition-colors"
      onClick={() => onClick(item)}
    >
      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={item.imageUrl || "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop"} 
          alt={item.name} 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm">{item.name}</h4>
          <Badge variant="secondary" className="text-xs">
            {count} {count === 1 ? 'time' : 'times'}
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {item.category}
          {item.metadata?.brand && ` • ${item.metadata.brand}`}
        </div>
        {lastWorn && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <Shirt className="h-3 w-3 mr-1" />
            Last worn: {lastWorn.toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
