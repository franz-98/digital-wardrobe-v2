
import { useState } from 'react';
import { calculateTimeRangeDates } from '../wardrobe/wardrobe-storage';

export interface StatsState {
  timeStart: Date | null;
  timeEnd: Date | null;
}

export function useStatsActions() {
  const [statsState, setStatsState] = useState<StatsState>({
    timeStart: null,
    timeEnd: null
  });

  const updateStatsForTimeRange = (range: string) => {
    console.log("Updating stats for time range:", range);
    const { start, end } = calculateTimeRangeDates(range);
    
    setStatsState({
      timeStart: start,
      timeEnd: end
    });
    
    // Trigger a global update event to notify any components that need to refresh
    window.dispatchEvent(new CustomEvent('wardrobe-stats-update', {
      detail: { range, start, end }
    }));
  };

  const updateStatsForCustomRange = (start: Date, end: Date) => {
    console.log("Updating stats for custom range:", start, "to", end);
    
    setStatsState({
      timeStart: start,
      timeEnd: end
    });
    
    // Trigger a global update event to notify any components that need to refresh
    window.dispatchEvent(new CustomEvent('wardrobe-stats-update', {
      detail: { range: 'custom', start, end }
    }));
  };

  return {
    statsState,
    updateStatsForTimeRange,
    updateStatsForCustomRange
  };
}
