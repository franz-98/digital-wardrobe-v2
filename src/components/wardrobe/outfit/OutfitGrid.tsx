
import React from "react";
import OutfitCard from "@/components/OutfitCard";
import { Outfit } from "@/components/wardrobe/types";

interface OutfitGridProps {
  outfits: Outfit[];
  handleOutfitClick: (outfit: Outfit) => void;
}

const OutfitGrid = ({ outfits, handleOutfitClick }: OutfitGridProps) => {
  if (outfits.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No outfits found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {outfits.map((outfit) => (
        <OutfitCard 
          key={outfit.id} 
          outfit={outfit} 
          onClick={() => handleOutfitClick(outfit)}
        />
      ))}
    </div>
  );
};

export default OutfitGrid;
