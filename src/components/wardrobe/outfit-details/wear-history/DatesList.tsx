
import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DatesListProps {
  wornDates: Date[];
  onDeleteDate: (date: Date) => void;
}

const DatesList = ({ wornDates, onDeleteDate }: DatesListProps) => {
  if (wornDates.length === 0) {
    return (
      <div className="text-sm text-muted-foreground py-2 text-center">
        No wear history recorded
      </div>
    );
  }

  return (
    <div className="space-y-1">
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
            
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteDate(date);
              }}
            >
              <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </div>
        ))}
    </div>
  );
};

export default DatesList;
