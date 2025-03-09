
import { useState } from "react";

export function useTimeRange() {
  const [timeRange, setTimeRange] = useState("month");
  
  return {
    timeRange,
    setTimeRange
  };
}
