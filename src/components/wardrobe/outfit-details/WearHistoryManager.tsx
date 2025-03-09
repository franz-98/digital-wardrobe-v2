
import React, { useState, useEffect } from "react";
import { Calendar, Clock, Trash2, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { loadOutfits, saveOutfits } from "@/hooks/wardrobe/wardrobe-storage";

interface WearHistoryManagerProps {
  outfitId: string;
}

const WearHistoryManager = ({ outfitId }: WearHistoryManagerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [wornDates, setWornDates] = useState<Date[]>([]);

  // Load wear history from storage on mount
  useEffect(() => {
    const allOutfits = loadOutfits();
    const currentOutfit = allOutfits.find(o => o.id === outfitId);
    
    if (currentOutfit?.metadata?.wornDates) {
      setWornDates(currentOutfit.metadata.wornDates.map(dateStr => new Date(dateStr)));
    } else {
      // Initialize with defaults if no saved dates
      const dates: Date[] = [];
      
      if (currentOutfit?.createdAt) {
        dates.push(new Date(currentOutfit.createdAt));
      }
      
      currentOutfit?.items.forEach(item => {
        if (item.metadata?.dateTaken) {
          dates.push(new Date(item.metadata.dateTaken));
        }
      });
      
      const uniqueDatesStr = [...new Set(dates.map(date => date.toISOString()))];
      setWornDates(uniqueDatesStr.map(dateStr => new Date(dateStr)));
      
      // Save these initial dates to storage
      if (dates.length > 0) {
        saveWornDatesToStorage(dates);
      }
    }
  }, [outfitId]);
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleAddWornDate = () => {
    if (selectedDate) {
      const dateExists = wornDates.some(date => 
        date.toDateString() === selectedDate.toDateString()
      );
      
      if (!dateExists) {
        const updatedDates = [...wornDates, selectedDate];
        setWornDates(updatedDates);
        saveWornDatesToStorage(updatedDates);
        console.log(`Added wear date: ${selectedDate.toLocaleDateString()}`);
      } else {
        console.log(`Date already exists: ${selectedDate.toLocaleDateString()}`);
      }
      
      // Reset selected date after adding
      setSelectedDate(new Date());
    }
  };
  
  const handleDeleteWornDate = (dateToDelete: Date) => {
    const updatedDates = wornDates.filter(date => 
      date.getTime() !== dateToDelete.getTime()
    );
    
    setWornDates(updatedDates);
    saveWornDatesToStorage(updatedDates);
    console.log(`Deleted wear date: ${dateToDelete.toLocaleDateString()}`);
  };
  
  const saveWornDatesToStorage = (dates: Date[]) => {
    // Get all outfits from storage
    const allOutfits = loadOutfits();
    
    // Find and update the current outfit
    const updatedOutfits = allOutfits.map(existingOutfit => {
      if (existingOutfit.id === outfitId) {
        // Create a metadata object if it doesn't exist
        const updatedOutfit = { 
          ...existingOutfit,
          metadata: existingOutfit.metadata || {} 
        };
        
        // Save the dates as strings
        updatedOutfit.metadata.wornDates = dates.map(date => date.toISOString());
        
        return updatedOutfit;
      }
      return existingOutfit;
    });
    
    // Save all outfits back to storage
    saveOutfits(updatedOutfits);
  };

  return (
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
        {wornDates.length > 0 ? (
          wornDates
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
  );
};

export default WearHistoryManager;
