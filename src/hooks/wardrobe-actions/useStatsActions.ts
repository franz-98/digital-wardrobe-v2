
export function useStatsActions() {
  const updateStatsForTimeRange = (range: string) => {
    console.log(`Updating stats for time range: ${range}`);
  };

  const updateStatsForCustomRange = (start: Date, end: Date) => {
    console.log(`Updating stats for custom range: ${start.toISOString()} to ${end.toISOString()}`);
  };

  return {
    updateStatsForTimeRange,
    updateStatsForCustomRange
  };
}
