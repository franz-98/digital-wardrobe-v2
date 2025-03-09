
import React from "react";
import { Calendar, Tag, Clock } from "lucide-react";

interface OutfitDetailsProps {
  creationDate?: Date;
  season?: string;
  colorPalette?: string[];
  wornDates?: Date[];
}

const OutfitDetails = ({ 
  creationDate = new Date(), 
  season = 'All Seasons', 
  colorPalette = [],
  wornDates = []
}: OutfitDetailsProps) => {
  const formattedDate = creationDate.toLocaleDateString('default', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <div className="px-4 pb-4 space-y-3">
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
        
        {colorPalette.length > 0 && (
          <div>
            <h5 className="text-sm font-medium mb-2 flex items-center">
              Color palette
            </h5>
            <div className="flex gap-2">
              {colorPalette.map((color, index) => (
                <div 
                  key={index}
                  className="w-6 h-6 rounded-full border border-border/50"
                  style={{ 
                    backgroundColor: color.toLowerCase(),
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                  }}
                />
              ))}
            </div>
          </div>
        )}
        
        {wornDates.length > 0 && (
          <div>
            <h5 className="text-sm font-medium mb-2 flex items-center">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              Wear history
            </h5>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {wornDates
                .sort((a, b) => b.getTime() - a.getTime()) // Sort by most recent first
                .map((date, index) => (
                  <div key={index} className="text-xs flex items-center gap-1.5 py-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/70" />
                    <span>{date.toLocaleDateString('default', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                ))
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutfitDetails;
