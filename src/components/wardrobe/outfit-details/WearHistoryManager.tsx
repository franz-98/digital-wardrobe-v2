
import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { DateEntryForm, DatesList } from "./wear-history";
import { loadOutfitWearDates, saveOutfitWearDates, loadOutfits, saveOutfits } from "@/hooks/wardrobe/wardrobe-storage";
import { toast } from "sonner";

interface WearHistoryManagerProps {
  outfitId: string;
  wornDates?: Date[];
}

const WearHistoryManager = ({ outfitId, wornDates: initialWornDates }: WearHistoryManagerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [wornDates, setWornDates] = useState<Date[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Load wear history from storage on mount or when initialWornDates changes
  useEffect(() => {
    if (initialWornDates && initialWornDates.length > 0) {
      setWornDates(initialWornDates);
      // Also save these dates to storage to ensure consistency
      saveOutfitWearDates(outfitId, initialWornDates);
    } else {
      const dates = loadOutfitWearDates(outfitId);
      setWornDates(dates);
    }
    setInitialized(true);
  }, [outfitId, initialWornDates]);
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleAddWornDate = () => {
    if (!selectedDate) return;
    
    const dateExists = wornDates.some(date => 
      date.toDateString() === selectedDate.toDateString()
    );
    
    if (!dateExists) {
      const updatedDates = [...wornDates, selectedDate];
      setWornDates(updatedDates);
      
      // Make sure we save to storage
      saveOutfitWearDates(outfitId, updatedDates);
      console.log(`Added wear date: ${selectedDate.toLocaleDateString()}`);
      
      // Force an update to the outfits store to ensure it persists
      const allOutfits = loadOutfits();
      saveOutfits(allOutfits);
      
      toast.success(`Added ${selectedDate.toLocaleDateString()} to wear history`);
    } else {
      console.log(`Date already exists: ${selectedDate.toLocaleDateString()}`);
      toast.error("This date is already in the wear history");
    }
    
    // Reset selected date after adding
    setSelectedDate(new Date());
  };
  
  const handleDeleteWornDate = (dateToDelete: Date) => {
    const updatedDates = wornDates.filter(date => 
      date.getTime() !== dateToDelete.getTime()
    );
    
    setWornDates(updatedDates);
    saveOutfitWearDates(outfitId, updatedDates);
    
    // Force an update to the outfits store to ensure it persists
    const allOutfits = loadOutfits();
    saveOutfits(allOutfits);
    
    console.log(`Deleted wear date: ${dateToDelete.toLocaleDateString()}`);
    toast.success(`Removed ${dateToDelete.toLocaleDateString()} from wear history`);
  };

  return (
    <div>
      <h5 className="text-sm font-medium mb-2 flex items-center">
        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
        Wear history
      </h5>
      
      <DateEntryForm
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        onAddDate={handleAddWornDate}
      />
      
      <div className="max-h-64 overflow-y-auto py-1 px-0.5">
        <DatesList 
          wornDates={wornDates} 
          onDeleteDate={handleDeleteWornDate} 
        />
      </div>
    </div>
  );
};

export default WearHistoryManager;
