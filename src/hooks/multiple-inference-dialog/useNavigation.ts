
import { useCallback, useRef } from "react";

export function useNavigation(
  currentIndex: number,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
  totalItems: number
) {
  // Add a debounce mechanism to prevent rapid clicks
  const lastNavigationTime = useRef<number>(0);
  
  const handleNavigate = useCallback((directionOrPage: 'prev' | 'next' | number) => {
    // Simple debounce to prevent multiple rapid clicks
    const now = Date.now();
    if (now - lastNavigationTime.current < 200) {
      return; // Ignore rapid clicks
    }
    lastNavigationTime.current = now;
    
    let nextIndex: number;
    
    if (typeof directionOrPage === 'number') {
      // Direct page navigation
      nextIndex = Math.max(0, Math.min(totalItems - 1, directionOrPage));
    } else {
      // Next/prev navigation
      if (directionOrPage === 'prev') {
        nextIndex = Math.max(0, currentIndex - 1);
      } else {
        nextIndex = Math.min(totalItems - 1, currentIndex + 1);
      }
    }
    
    // Only update if we're changing to a different index
    if (nextIndex !== currentIndex) {
      setCurrentIndex(nextIndex);
    }
  }, [currentIndex, setCurrentIndex, totalItems]);

  return { handleNavigate };
}
