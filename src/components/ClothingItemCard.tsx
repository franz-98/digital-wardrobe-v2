
import React from "react";
import { Card } from "@/components/ui/card";

interface ClothingItem {
  id: string;
  name: string;
  category: string;
  color: string;
  imageUrl: string;
  metadata?: {
    dateTaken?: string;
    brand?: string;
    material?: string;
    season?: string;
  };
}

interface ClothingItemCardProps {
  item: ClothingItem;
  onClick: () => void;
}

const ClothingItemCard = ({ item, onClick }: ClothingItemCardProps) => {
  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all hover:shadow-md border"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm mb-1">{item.name}</h3>
        <p className="text-xs text-muted-foreground">{item.category}</p>
      </div>
    </Card>
  );
};

export default ClothingItemCard;
