
import { useState, useRef } from "react";
import { format } from "date-fns";
import { Clock, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TimeRangeSelectorProps } from "./types";
import TimeRangeMenu from "./TimeRangeMenu";
import CustomRangeSelector from "./CustomRangeSelector";

const TimeRangeSelector = ({ 
  timeRange, 
  setTimeRange,
  updateStatsForTimeRange,
  updateStatsForCustomRange
}: TimeRangeSelectorProps) => {
  const timeRangeMenuRef = useRef<HTMLDivElement>(null);
  const timeRangeButtonRef = useRef<HTMLButtonElement>(null);
  
  const [showTimeRangeMenu, setShowTimeRangeMenu] = useState(false);
  const [showCustomRange, setShowCustomRange] = useState(false);

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

  const handleCustomRangeConfirm = (startDate: Date, endDate: Date) => {
    setTimeRange(`${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d')}`);
    setShowCustomRange(false);
    setShowTimeRangeMenu(false);
    
    updateStatsForCustomRange(startDate, endDate);
  };

  const handleCustomRangeClose = () => {
    setShowCustomRange(false);
  };

  return (
    <div className="flex items-center">
      <div className="relative">
        {showTimeRangeMenu && !showCustomRange && (
          <TimeRangeMenu 
            timeRange={timeRange} 
            onSelectTimeRange={selectTimeRange} 
          />
        )}
        
        {showCustomRange && (
          <CustomRangeSelector 
            onClose={handleCustomRangeClose}
            onConfirm={handleCustomRangeConfirm}
          />
        )}
      </div>
      
      <Button 
        ref={timeRangeButtonRef}
        variant="outline" 
        size="sm" 
        className="h-10 px-3 text-xs font-medium rounded-full bg-background border border-border/50 shadow-sm flex items-center"
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
