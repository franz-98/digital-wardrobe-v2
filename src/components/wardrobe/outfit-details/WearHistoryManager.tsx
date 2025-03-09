
import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { DateEntryForm, DatesList } from "./wear-history";
import { loadOutfitWearDates, saveOutfitWearDates } from "@/hooks/wardrobe/wardrobe-storage";

interface WearHistoryManagerProps {
  outfitId: string;
  wornDates?: Date[];
}

const WearHistoryManager = ({ outfitId, wornDates: initialWornDates }: WearHistoryManagerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [wornDates, setWornDates] = useState<Date[]>([]);

  // Load wear history from storage on mount or when initialWornDates changes
  useEffect(() => {
    if (initialWornDates && initialWornDates.length > 0) {
      setWornDates(initialWornDates);
    } else {
      const dates = loadOutfitWearDates(outfitId);
      setWornDates(dates);
    }
  }, [outfitId, initialWornDates]);
  
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
        saveOutfitWearDates(outfitId, updatedDates);
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
    saveOutfitWearDates(outfitId, updatedDates);
    console.log(`Deleted wear date: ${dateToDelete.toLocaleDateString()}`);
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
