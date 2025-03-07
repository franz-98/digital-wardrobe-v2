
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ClothingItem } from '@/components/wardrobe/types';

interface OutfitItemsProps {
  items: ClothingItem[];
  onItemClick: (item: ClothingItem) => void;
}

const OutfitItems = ({ items, onItemClick }: OutfitItemsProps) => {
  return (
    <div>
      <h4 className="font-medium mb-2 flex items-center">
        Items in this outfit <span className="ml-2 text-xs text-muted-foreground">({items.length})</span>
      </h4>
      <div className="space-y-2">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => onItemClick(item)}
          >
            <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <p className="font-medium">{item.name}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground">{item.category}</p>
                <Badge 
                  variant="outline" 
                  className="text-xs h-4 px-1.5 bg-secondary/10"
                >
                  {item.color}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutfitItems;
