
import React from 'react';
import { Calendar, Tag } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { colorNameToHex } from "../utils/colorUtils";

interface OutfitDetailsProps {
  creationDate: Date;
  season: string;
  colorPalette: string[];
}

const OutfitDetails = ({ creationDate, season, colorPalette }: OutfitDetailsProps) => {
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
      
      <div>
        <h5 className="text-sm font-medium mb-2 flex items-center">
          Color palette
        </h5>
        <div className="flex gap-2">
          {colorPalette.map((color, index) => {
            const hexColor = colorNameToHex(color);
            
            return (
              <Popover key={index}>
                <PopoverTrigger asChild>
                  <div 
                    className="w-8 h-8 rounded-full border border-border/50 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all"
                    style={{ 
                      backgroundColor: color.toLowerCase(),
                      boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                    }}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{color}</p>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full border border-border/50"
                        style={{ backgroundColor: hexColor }}
                      />
                      <code className="text-xs bg-muted px-1 py-0.5 rounded">{hexColor}</code>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OutfitDetails;
