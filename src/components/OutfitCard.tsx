
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
}

const OutfitCard = ({ outfit }: OutfitCardProps) => {
  return (
    <Card className="overflow-hidden cursor-pointer transition-all hover:shadow-md border">
      <div className="aspect-video overflow-hidden relative">
        <img
          src={outfit.imageUrl || outfit.items[0]?.imageUrl}
          alt={outfit.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/30 flex items-end p-4">
          <h3 className="text-white font-semibold">{outfit.name}</h3>
        </div>
      </div>
      <div className="p-3">
        <div className="flex gap-1 overflow-x-auto pb-2">
          {outfit.items.map((item) => (
            <div
              key={`item-thumb-${item.id}`}
              className="h-10 w-10 rounded-md flex-shrink-0 overflow-hidden border"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {outfit.items.length} items
        </p>
      </div>
    </Card>
  );
};

export default OutfitCard;
