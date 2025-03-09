
import React from 'react';
import { Calendar } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Outfit } from '../../types';
import { OutfitUsage } from './types';

interface OutfitCardProps {
  outfitUsage: OutfitUsage;
  onClick: (outfit: Outfit) => void;
}

const OutfitCard: React.FC<OutfitCardProps> = ({ outfitUsage, onClick }) => {
  const { outfit, count, lastWorn } = outfitUsage;

  return (
    <div 
      className="flex gap-3 items-start hover:bg-muted/40 p-2 rounded-md cursor-pointer transition-colors"
      onClick={() => onClick(outfit)}
    >
      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={outfit.imageUrl || outfit.items[0]?.imageUrl || "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop"} 
          alt={outfit.name} 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm">{outfit.name}</h4>
          <Badge variant="secondary" className="text-xs">
            {count} {count === 1 ? 'time' : 'times'}
          </Badge>
        </div>
        {lastWorn && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            Last worn: {lastWorn.toLocaleDateString()}
          </div>
        )}
        <div className="flex gap-1 mt-1">
          {outfit.items.slice(0, 4).map(item => (
            <div 
              key={item.id} 
              className="w-5 h-5 rounded-sm overflow-hidden border"
            >
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover" 
              />
            </div>
          ))}
          {outfit.items.length > 4 && (
            <div className="w-5 h-5 rounded-sm bg-muted flex items-center justify-center text-xs">
              +{outfit.items.length - 4}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutfitCard;
