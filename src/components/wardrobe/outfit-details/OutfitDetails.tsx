
import React from "react";
import { Calendar, Tag } from "lucide-react";
import { WearHistoryManager } from "./";
import { ColorPaletteDisplay } from "./";

interface OutfitDetailsProps {
  creationDate: Date;
  season: string;
  colorPalette: string[];
  outfitId: string;
  wornDates?: Date[]; // Added wornDates as an optional prop
}

const OutfitDetails = ({ 
  creationDate, 
  season, 
  colorPalette,
  outfitId,
  wornDates = [] // Provide a default empty array
}: OutfitDetailsProps) => {
  const formattedDate = creationDate.toLocaleDateString('default', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <div className="bg-muted/30 p-4 rounded-lg space-y-3">
      <h4 className="font-medium">Outfit Details</h4>
      
      <div className="flex items-center gap-2 text-sm">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span>Created on {formattedDate}</span>
      </div>
      
      <div className="flex items-center gap-2 text-sm">
        <Tag className="h-4 w-4 text-muted-foreground" />
        <span>{season}</span>
      </div>
      
      <ColorPaletteDisplay colors={colorPalette} />
      
      <WearHistoryManager outfitId={outfitId} wornDates={wornDates} />
    </div>
  );
};

export default OutfitDetails;
