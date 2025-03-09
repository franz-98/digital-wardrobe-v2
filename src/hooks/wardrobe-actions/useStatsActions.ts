
import { useState } from 'react';
import { format } from 'date-fns';

export function useStatsActions() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("month");
  const [customRangeStart, setCustomRangeStart] = useState<Date | null>(null);
  const [customRangeEnd, setCustomRangeEnd] = useState<Date | null>(null);

  const updateStatsForTimeRange = (range: string) => {
    console.log(`Updating stats for time range: ${range}`);
    setSelectedTimeRange(range);
    // Reset custom range when using a preset
    setCustomRangeStart(null);
    setCustomRangeEnd(null);
  };

  const updateStatsForCustomRange = (start: Date, end: Date) => {
    console.log(`Updating stats for custom range: ${start.toISOString()} to ${end.toISOString()}`);
    setSelectedTimeRange("custom");
    setCustomRangeStart(start);
    setCustomRangeEnd(end);
    
    // Format dates in a consistent way for all components to filter properly
    const formattedStart = format(start, 'MMM d');
    const formattedEnd = format(end, 'MMM d');
    setSelectedTimeRange(`${formattedStart} - ${formattedEnd}`);
  };

  return {
    selectedTimeRange,
    customRangeStart,
    customRangeEnd,
    updateStatsForTimeRange,
    updateStatsForCustomRange
  };
}
