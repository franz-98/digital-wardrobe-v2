
import React from "react";
import { Card } from "@/components/ui/card";

interface RecentUpload {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}

interface RecentItemCardProps {
  item: RecentUpload;
  onClick: () => void;
}

const RecentItemCard = ({ item, onClick }: RecentItemCardProps) => {
  return (
    <Card 
      className="min-w-[160px] max-w-[160px] overflow-hidden card-shadow border interactive-scale cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden bg-secondary/30">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <p className="font-medium text-sm truncate">{item.name}</p>
        <p className="text-xs text-muted-foreground">{item.category}</p>
      </div>
    </Card>
  );
};

export default RecentItemCard;
