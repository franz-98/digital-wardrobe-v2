
import React, { useState, useEffect } from "react";
import { Calendar, Tag, Clock, Trash2, Plus } from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { colorNameToHex } from "@/components/wardrobe/utils/colorUtils";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { saveOutfitWearDates } from "@/hooks/wardrobe/wardrobe-storage";

interface OutfitDetailsProps {
  creationDate?: Date;
  season?: string;
  colorPalette?: string[];
  wornDates?: Date[];
  outfitId?: string;
  onDeleteWornDate?: (date: Date) => void;
  onAddWornDate?: (date: Date) => void;
}

const OutfitDetails = ({ 
  creationDate = new Date(), 
  season = 'All Seasons', 
  colorPalette = [],
  wornDates = [],
  outfitId,
  onDeleteWornDate,
  onAddWornDate
}: OutfitDetailsProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [localWornDates, setLocalWornDates] = useState<Date[]>(wornDates);
  
  // Update local dates when prop changes
  useEffect(() => {
    setLocalWornDates(wornDates);
  }, [wornDates]);
  
  // Save wear dates when they change
  useEffect(() => {
    if (outfitId && localWornDates.length > 0) {
      saveOutfitWearDates(outfitId, localWornDates);
    }
  }, [localWornDates, outfitId]);

  const formattedDate = creationDate.toLocaleDateString('default', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleAddWornDate = () => {
    if (selectedDate) {
      if (onAddWornDate) {
        onAddWornDate(selectedDate);
      } else if (outfitId) {
        // Handle adding date locally if no callback provided
        const dateExists = localWornDates.some(date => 
          date.toDateString() === selectedDate.toDateString()
        );
        
        if (!dateExists) {
          const updatedDates = [...localWornDates, selectedDate];
          setLocalWornDates(updatedDates);
          console.log(`Added wear date: ${selectedDate.toLocaleDateString()}`);
          
          // Save directly to storage
          saveOutfitWearDates(outfitId, updatedDates);
        }
      }
      
      // Reset selected date after adding
      setSelectedDate(new Date());
    }
  };
  
  const handleDeleteWornDate = (dateToDelete: Date) => {
    if (onDeleteWornDate) {
      onDeleteWornDate(dateToDelete);
    } else if (outfitId) {
      // Handle deleting date locally if no callback provided
      const updatedDates = localWornDates.filter(date => 
        date.getTime() !== dateToDelete.getTime()
      );
      
      setLocalWornDates(updatedDates);
      console.log(`Deleted wear date: ${dateToDelete.toLocaleDateString()}`);
      
      // Save directly to storage
      saveOutfitWearDates(outfitId, updatedDates);
    }
  };

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
              {colorPalette.map((color, index) => {
                const hexColor = colorNameToHex(color);
                
                return (
                  <Popover key={index}>
                    <PopoverTrigger asChild>
                      <div 
                        className="w-6 h-6 rounded-full border border-border/50 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all"
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
        )}
        
        <div>
          <h5 className="text-sm font-medium mb-2 flex items-center">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            Wear history
          </h5>
          
          {/* Date picker for adding worn dates */}
          <div className="mb-3 border border-border/50 rounded-md p-2 bg-background/50">
            <div className="text-xs text-muted-foreground mb-2">Add a new date:</div>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-8 flex-1 justify-start font-normal"
                  >
                    <Calendar className="mr-2 h-3.5 w-3.5" />
                    {selectedDate ? format(selectedDate, 'MMM d, yyyy') : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              
              <Button 
                size="sm" 
                className="h-8" 
                onClick={handleAddWornDate}
                disabled={!selectedDate}
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add
              </Button>
            </div>
          </div>
          
          <div className="space-y-1 max-h-64 overflow-y-auto py-1 px-0.5">
            {localWornDates.length > 0 ? (
              localWornDates
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
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteWornDate(date);
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  </div>
                ))
            ) : (
              <div className="text-sm text-muted-foreground py-2 text-center">
                No wear history recorded
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitDetails;
