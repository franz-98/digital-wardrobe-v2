
import React from 'react';
import { Calendar, Tag, Clock, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { colorNameToHex } from "../utils/colorUtils";

interface OutfitDetailsProps {
  creationDate: Date;
  season: string;
  colorPalette: string[];
  wornDates?: Date[];
  onDeleteWornDate?: (date: Date) => void;
}

const OutfitDetails = ({ 
  creationDate, 
  season, 
  colorPalette, 
  wornDates = [],
  onDeleteWornDate
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

      {wornDates.length > 0 && (
        <div>
          <h5 className="text-sm font-medium mb-2 flex items-center">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            Wear history
          </h5>
          <div className="space-y-1 max-h-48 overflow-y-auto py-1 px-0.5">
            {wornDates
              .sort((a, b) => b.getTime() - a.getTime()) // Sort by most recent first
              .map((date, index) => (
                <div 
                  key={index} 
                  className="text-sm flex items-center justify-between gap-1.5 py-1.5 px-2 hover:bg-muted/50 rounded-md transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/70" />
                    <span>{date.toLocaleDateString('default', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  
                  {onDeleteWornDate && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteWornDate(date);
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  )}
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default OutfitDetails;
