
/**
 * Calculate time range start and end dates from string format
 */
export const calculateTimeRangeDates = (timeRange: string): { start: Date, end: Date } => {
  const now = new Date();
  const end = new Date(now);
  let start: Date;
  
  // Parse custom date range
  if (timeRange.includes(" - ")) {
    const [startStr, endStr] = timeRange.split(" - ");
    // Simple parsing for MMM d format
    const parseCustomDate = (dateStr: string) => {
      const months: Record<string, number> = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
      };
      const match = dateStr.match(/([A-Za-z]{3})\s+(\d+)/);
      if (match) {
        const month = months[match[1]];
        const day = parseInt(match[2]);
        const date = new Date();
        date.setMonth(month);
        date.setDate(day);
        return date;
      }
      return new Date(now);
    };
    
    start = parseCustomDate(startStr);
    const customEnd = parseCustomDate(endStr);
    
    // If end date is before start date, it might be in the next year
    if (customEnd < start) {
      customEnd.setFullYear(customEnd.getFullYear() + 1);
    }
    
    return { start, end: customEnd };
  } 
  
  // Standard time ranges
  if (timeRange === "week") {
    start = new Date(now);
    start.setDate(now.getDate() - 7);
  } else if (timeRange === "month") {
    start = new Date(now);
    start.setMonth(now.getMonth() - 1);
  } else {
    // Default to all time - 1 year back
    start = new Date(now);
    start.setFullYear(now.getFullYear() - 1);
  }
  
  return { start, end };
};
