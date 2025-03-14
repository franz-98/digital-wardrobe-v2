
import { useCallback, useRef, useEffect } from "react";

export function useNavigation(
  currentIndex: number,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
  totalItems: number,
  scrollAreaRef: React.RefObject<HTMLDivElement>,
  isNavigating: React.MutableRefObject<boolean>
) {
  const isUpdating = useRef(false);
  
  useEffect(() => {
    return () => {
      isNavigating.current = false;
      isUpdating.current = false;
    };
  }, [isNavigating]);

  const handleNavigate = useCallback((directionOrPage: 'prev' | 'next' | number) => {
    // Prevent navigation if already in progress
    if (isNavigating.current || isUpdating.current) {
      return;
    }
    
    // Set navigation lock
    isNavigating.current = true;
    isUpdating.current = true;
    
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
      // Reset scroll position first
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = 0;
      }
      
      // Update state with small delay to ensure UI is ready
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        
        // Release navigation lock after a delay
        setTimeout(() => {
          isNavigating.current = false;
          isUpdating.current = false;
        }, 500); // Longer cooldown to prevent rapid navigation
      }, 50);
    } else {
      // Release locks if no navigation needed
      isNavigating.current = false;
      isUpdating.current = false;
    }
  }, [currentIndex, setCurrentIndex, totalItems, scrollAreaRef]);

  return { handleNavigate };
}
