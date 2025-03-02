
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
        <Badge
          className="absolute top-2 right-2"
          style={{
            backgroundColor: 
              item.color.toLowerCase() === "white" 
                ? "#f5f5f5" 
                : undefined,
            color: 
              item.color.toLowerCase() === "white" 
                ? "#333" 
                : undefined,
            border: 
              item.color.toLowerCase() === "white" 
                ? "1px solid #000000" 
                : undefined
          }}
        >
          {item.color}
        </Badge>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm mb-1">{item.name}</h3>
        <p className="text-xs text-muted-foreground">{item.category}</p>
      </div>
    </Card>
  );
};

export default ClothingItemCard;
