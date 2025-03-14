
import { useCallback, useRef } from "react";

export function useNavigation(
  currentIndex: number,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
  totalItems: number
) {
  // Add a debounce mechanism to prevent rapid clicks
  const lastNavigationTimeRef = useRef<number>(0);
  
  const handleNavigate = useCallback((directionOrPage: 'prev' | 'next' | number) => {
    // Simple debounce to prevent multiple rapid clicks
    const now = Date.now();
    if (now - lastNavigationTimeRef.current < 300) {
      return; // Ignore rapid clicks
    }
    lastNavigationTimeRef.current = now;
    
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
      
      // Scroll to top when navigating between items
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Also reset focus to avoid keyboard issues
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  }, [currentIndex, setCurrentIndex, totalItems]);

  return { handleNavigate };
}
