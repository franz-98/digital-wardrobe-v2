
import { useState } from 'react';

export function useStatsActions() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("week");
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
    
    // Also update the string representation for components that use it directly
    const formattedStart = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const formattedEnd = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
