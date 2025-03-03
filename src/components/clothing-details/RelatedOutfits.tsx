
import { Shirt } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Outfit } from "@/components/wardrobe/types";

interface RelatedOutfitsProps {
  relatedOutfits: Outfit[];
  onOutfitClick: (outfit: Outfit) => void;
}

const RelatedOutfits = ({ relatedOutfits, onOutfitClick }: RelatedOutfitsProps) => {
  if (relatedOutfits.length === 0) return null;
  
  return (
    <div className="overflow-y-auto overscroll-bounce">
      <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
        <Shirt className="h-3.5 w-3.5" /> Related Outfits
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {relatedOutfits.map((outfit) => (
          <Card 
            key={`outfit-${outfit.id}`}
            className="overflow-hidden border cursor-pointer hover:shadow-sm transition-shadow"
            onClick={() => onOutfitClick(outfit)}
          >
            <div className="aspect-square overflow-hidden bg-secondary/10">
              <img 
                src={outfit.imageUrl || outfit.items[0]?.imageUrl} 
                alt={outfit.name} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-1.5">
              <p className="text-xs font-medium truncate">{outfit.name}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedOutfits;
