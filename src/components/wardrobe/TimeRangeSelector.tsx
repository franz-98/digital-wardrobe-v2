
import { useState, useRef } from "react";
import { format, isBefore } from "date-fns";
import { Calendar, Clock, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";

interface TimeRangeSelectorProps {
  timeRange: string;
  setTimeRange: (range: string) => void;
  updateStatsForTimeRange: (range: string) => void;
  updateStatsForCustomRange: (start: Date, end: Date) => void;
}

const TimeRangeSelector = ({ 
  timeRange, 
  setTimeRange,
  updateStatsForTimeRange,
  updateStatsForCustomRange
}: TimeRangeSelectorProps) => {
  const { toast } = useToast();
  const timeRangeMenuRef = useRef<HTMLDivElement>(null);
  const timeRangeButtonRef = useRef<HTMLButtonElement>(null);
  
  const [showTimeRangeMenu, setShowTimeRangeMenu] = useState(false);
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  const toggleTimeRangeMenu = () => {
    setShowTimeRangeMenu(!showTimeRangeMenu);
    if (showCustomRange) {
      setShowCustomRange(false);
    }
  };

  const selectTimeRange = (range: string) => {
    if (range === "custom") {
      setShowCustomRange(true);
    } else {
      setTimeRange(range);
      setShowTimeRangeMenu(false);
      
      updateStatsForTimeRange(range);
    }
  };

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
      
      setTimeRange(`${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d')}`);
      setShowCustomRange(false);
      setShowTimeRangeMenu(false);
      
      updateStatsForCustomRange(startDate, endDate);
      
      toast({
        title: "Custom range applied",
        description: `Date range set to ${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d')}`,
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        {showTimeRangeMenu && !showCustomRange && (
          <div 
            ref={timeRangeMenuRef}
            className="absolute top-full right-0 mt-2 z-10 bg-background/90 backdrop-blur-lg rounded-xl shadow-lg border border-border/50 py-1 text-sm w-40 overflow-hidden animate-fade-in"
          >
            <button 
              className={`w-full text-left px-4 py-2.5 hover:bg-primary/10 text-foreground transition-colors ${timeRange === "week" ? "font-medium text-primary" : ""}`}
              onClick={() => selectTimeRange("week")}
            >
              Last week
            </button>
            <button 
              className={`w-full text-left px-4 py-2.5 hover:bg-primary/10 text-foreground transition-colors ${timeRange === "month" ? "font-medium text-primary" : ""}`}
              onClick={() => selectTimeRange("month")}
            >
              Last month
            </button>
            <button 
              className={`w-full text-left px-4 py-2.5 hover:bg-primary/10 text-foreground transition-colors ${timeRange !== "week" && timeRange !== "month" ? "font-medium text-primary" : ""}`}
              onClick={() => selectTimeRange("custom")}
            >
              Custom range...
            </button>
          </div>
        )}
        
        {showCustomRange && (
          <div
            ref={timeRangeMenuRef}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10 bg-background/95 backdrop-blur-lg rounded-xl shadow-lg border border-border/50 p-3 text-sm w-72 animate-fade-in"
            style={{ maxWidth: "calc(100vw - 2rem)" }}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Select date range</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowCustomRange(false)}
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
        )}
      </div>
      
      <Button 
        ref={timeRangeButtonRef}
        variant="outline" 
        size="sm" 
        className="h-8 px-3 text-xs font-medium rounded-full bg-background border border-border/50 shadow-sm flex items-center"
        onClick={toggleTimeRangeMenu}
      >
        <Clock className="h-3.5 w-3.5 mr-1.5 opacity-70" />
        {timeRange === "week" ? "Last week" : timeRange === "month" ? "Last month" : timeRange}
        <ChevronDown className="h-3.5 w-3.5 ml-1.5 opacity-70" />
      </Button>
    </div>
  );
};

export default TimeRangeSelector;
