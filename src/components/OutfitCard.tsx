
import React from "react";
import { Card } from "@/components/ui/card";

interface ClothingItem {
  id: string;
  name: string;
  category: string;
  color: string;
  imageUrl: string;
}

interface Outfit {
  id: string;
  name: string;
  items: ClothingItem[];
  imageUrl?: string;
}

interface OutfitCardProps {
  outfit: Outfit;
  onClick?: () => void;
}

const OutfitCard = ({ outfit, onClick }: OutfitCardProps) => {
  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-all hover:shadow-md border"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          src={outfit.imageUrl || outfit.items[0]?.imageUrl}
          alt={outfit.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/30 flex items-end p-2">
          <h3 className="text-white font-medium text-xs">{outfit.name}</h3>
        </div>
      </div>
      <div className="p-1.5">
        <div className="flex gap-0.5 overflow-x-auto pb-1">
          {outfit.items.map((item) => (
            <div
              key={`item-thumb-${item.id}`}
              className="h-4 w-4 rounded-md flex-shrink-0 overflow-hidden border"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          {outfit.items.length} items
        </p>
      </div>
    </Card>
  );
};

export default OutfitCard;
