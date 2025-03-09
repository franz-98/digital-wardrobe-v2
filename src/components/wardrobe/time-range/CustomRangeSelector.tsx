
import { useState } from "react";
import { format, isBefore } from "date-fns";
import { Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";

interface CustomRangeSelectorProps {
  onClose: () => void;
  onConfirm: (startDate: Date, endDate: Date) => void;
}

const CustomRangeSelector = ({ onClose, onConfirm }: CustomRangeSelectorProps) => {
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date);
    
    setTimeout(() => {
      const popoverElements = document.querySelectorAll('[data-state="open"][data-radix-popper-content-wrapper]');
      popoverElements.forEach(element => {
        const closeButton = element.querySelector('button[type="button"]');
        if (closeButton && closeButton instanceof HTMLButtonElement) {
          closeButton.click();
        }
      });
    }, 10);
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    setEndDate(date);
    
    setTimeout(() => {
      const popoverElements = document.querySelectorAll('[data-state="open"][data-radix-popper-content-wrapper]');
      popoverElements.forEach(element => {
        const closeButton = element.querySelector('button[type="button"]');
        if (closeButton && closeButton instanceof HTMLButtonElement) {
          closeButton.click();
        }
      });
    }, 10);
  };

  const confirmCustomRange = () => {
    if (startDate && endDate) {
      if (isBefore(endDate, startDate)) {
        toast({
          title: "Invalid date range",
          description: "End date cannot be before start date",
        });
        return;
      }
      
      onConfirm(startDate, endDate);
    }
  };

  return (
    <div
      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10 bg-background/95 backdrop-blur-lg rounded-xl shadow-lg border border-border/50 p-3 text-sm w-72 animate-fade-in"
      style={{ maxWidth: "calc(100vw - 2rem)" }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Select date range</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="h-7 w-7"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex flex-col gap-2 mb-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-start text-left font-normal"
              size="sm"
            >
              <Calendar className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, 'PPP') : "Start date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <CalendarComponent
              mode="single"
              selected={startDate}
              onSelect={handleStartDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-start text-left font-normal"
              size="sm"
            >
              <Calendar className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, 'PPP') : "End date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <CalendarComponent
              mode="single"
              selected={endDate}
              onSelect={handleEndDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <Button 
        className="w-full"
        size="sm"
        onClick={confirmCustomRange}
        disabled={!startDate || !endDate}
      >
        Apply range
      </Button>
    </div>
  );
};

export default CustomRangeSelector;
