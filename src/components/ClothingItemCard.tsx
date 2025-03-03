
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
  // Use a fallback image if the provided URL is invalid or missing
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop";
  };

  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all hover:shadow-md border"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          src={item.imageUrl || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop"}
          alt={item.name}
          className="object-cover w-full h-full"
          onError={handleImageError}
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
