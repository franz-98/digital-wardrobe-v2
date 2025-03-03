
import React from "react";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  onDelete?: (id: string) => void;
  showDeleteButton?: boolean;
}

const ClothingItemCard = ({ 
  item, 
  onClick, 
  onDelete,
  showDeleteButton = false
}: ClothingItemCardProps) => {
  // Use a fallback image if the provided URL is invalid or missing
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop";
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card's onClick
    if (onDelete) {
      onDelete(item.id);
    }
  };

  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all hover:shadow-md border relative"
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

        {showDeleteButton && (
          <Button 
            variant="destructive" 
            size="sm" 
            className="w-full mt-2 h-7 text-xs"
            onClick={handleDelete}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ClothingItemCard;
