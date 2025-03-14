
import { useCallback, useRef, useEffect } from "react";

export function useNavigation(
  currentIndex: number,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
  totalItems: number,
  scrollAreaRef: React.RefObject<HTMLDivElement>,
  isNavigating: React.MutableRefObject<boolean>
) {
  // Track if we're in the middle of updating
  const isUpdating = useRef(false);
  
  // Cleanup function to reset navigation state when component unmounts
  useEffect(() => {
    return () => {
      isNavigating.current = false;
      isUpdating.current = false;
    };
  }, [isNavigating]);

  const handleNavigate = useCallback((directionOrPage: 'prev' | 'next' | number) => {
    // Prevent rapid multiple navigation clicks
    if (isNavigating.current) {
      console.log("Navigation blocked: already navigating");
      return;
    }
    
    isNavigating.current = true;
    console.log(`Navigation started: ${typeof directionOrPage === 'number' ? `to page ${directionOrPage + 1}` : directionOrPage}`);

    let nextIndex: number;
    
    // Handle direct page navigation vs prev/next
    if (typeof directionOrPage === 'number') {
      // Direct page jump - bounds checking
      nextIndex = Math.max(0, Math.min(totalItems - 1, directionOrPage));
      console.log(`Direct navigation to page: ${nextIndex + 1}`);
    } else {
      // Directional navigation
      if (directionOrPage === 'prev') {
        nextIndex = Math.max(0, currentIndex - 1);
      } else {
        nextIndex = Math.min(totalItems - 1, currentIndex + 1);
      }
      console.log(`Directional navigation: ${directionOrPage}, from ${currentIndex + 1} to ${nextIndex + 1}`);
    }
    
    // Only update if it's a valid index change
    if (nextIndex !== currentIndex) {
      console.log(`Setting current index to ${nextIndex}`);
      
      // Immediate state update with direct value instead of function
      setCurrentIndex(nextIndex);
      
      // Reset scroll position when navigating between items
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = 0;
      }
      
      // Reduce timeout for better responsiveness
      setTimeout(() => {
        isNavigating.current = false;
        console.log("Navigation cooldown complete, ready for next navigation");
      }, 100);
    } else {
      console.log(`Navigation cancelled: already at ${nextIndex + 1}`);
      isNavigating.current = false;
    }
  }, [currentIndex, setCurrentIndex, totalItems, scrollAreaRef]);

  return { handleNavigate };
}
