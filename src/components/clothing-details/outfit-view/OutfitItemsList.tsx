
import React from "react";
import { Shirt } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClothingItem } from "@/components/wardrobe/types";

interface OutfitItemsListProps {
  items: ClothingItem[];
  onItemClick: (itemId: string) => void;
}

const OutfitItemsList = ({ items, onItemClick }: OutfitItemsListProps) => {
  return (
    <div className="px-4 pb-4 space-y-3">
      <h3 className="text-sm font-medium flex items-center gap-1">
        <Shirt className="h-4 w-4" /> Items in this outfit <span className="ml-1 text-muted-foreground">({items.length})</span>
      </h3>
      
      <div className="space-y-2">
        {items.map((outfitItem) => (
          <Card 
            key={`outfit-item-${outfitItem.id}`}
            className="overflow-hidden border shadow-sm cursor-pointer"
            onClick={() => onItemClick(outfitItem.id)}
          >
            <div className="flex gap-3 p-3">
              <div 
                className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-secondary/20"
              >
                <img 
                  src={outfitItem.imageUrl} 
                  alt={outfitItem.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{outfitItem.name}</h4>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs bg-secondary/10">
                    {outfitItem.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ 
                        backgroundColor: outfitItem.color.toLowerCase() === "white" ? "#EEEEEE" : outfitItem.color,
                        border: outfitItem.color.toLowerCase() === "white" ? "1px solid #DDDDDD" : "none"
                      }}
                    />
                    <span className="text-xs text-muted-foreground">{outfitItem.color}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OutfitItemsList;
