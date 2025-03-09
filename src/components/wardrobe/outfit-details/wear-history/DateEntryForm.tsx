
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DatePickerInput } from "./";

interface DateEntryFormProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  onAddDate: () => void;
}

const DateEntryForm = ({ 
  selectedDate, 
  onDateSelect, 
  onAddDate 
}: DateEntryFormProps) => {
  return (
    <div className="mb-3 border border-border/50 rounded-md p-2 bg-background/50">
      <div className="text-xs text-muted-foreground mb-2">Add a new date:</div>
      <div className="flex gap-2">
        <DatePickerInput 
          selectedDate={selectedDate} 
          onDateSelect={onDateSelect} 
        />
        
        <Button 
          size="sm" 
          className="h-8" 
          onClick={onAddDate}
          disabled={!selectedDate}
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          Add
        </Button>
      </div>
    </div>
  );
};

export default DateEntryForm;
