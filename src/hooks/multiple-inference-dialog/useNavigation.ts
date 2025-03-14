
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
    // Prevent rapid multiple navigation clicks or processing while already updating
    if (isNavigating.current || isUpdating.current) {
      console.log("Navigation blocked: already navigating or updating");
      return;
    }
    
    isNavigating.current = true;
    isUpdating.current = true;
    console.log(`Navigation started: ${typeof directionOrPage === 'number' ? `to page ${directionOrPage + 1}` : directionOrPage}`);

    let nextIndex: number;
    
    // Handle direct page navigation vs prev/next
    if (typeof directionOrPage === 'number') {
      // Direct page jump - bounds checking
      nextIndex = Math.max(0, Math.min(totalItems - 1, directionOrPage));
      console.log(`Direct navigation to page: ${nextIndex + 1}`);
    } else {
      // Directional navigation
      nextIndex = directionOrPage === 'prev' 
        ? Math.max(0, currentIndex - 1)
        : Math.min(totalItems - 1, currentIndex + 1);
      console.log(`Directional navigation: ${directionOrPage}, from ${currentIndex + 1} to ${nextIndex + 1}`);
    }
    
    // Only update if it's a valid index change
    if (nextIndex !== currentIndex) {
      console.log(`Setting current index to ${nextIndex}`);
      setCurrentIndex(nextIndex);
      
      // Don't reset scroll immediately - wait until the new content is rendered
      setTimeout(() => {
        if (scrollAreaRef.current) {
          // Don't programmatically scroll - let the user control scrolling
          // We'll just make sure that any existing scroll handlers don't interfere
        }
        
        // Allow navigation again after a delay
        setTimeout(() => {
          isNavigating.current = false;
          isUpdating.current = false;
          console.log("Navigation cooldown complete, ready for next navigation");
        }, 600); // Increased timeout to ensure all animations complete
      }, 100);
    } else {
      console.log(`Navigation cancelled: already at ${nextIndex + 1}`);
      isNavigating.current = false;
      isUpdating.current = false;
    }
  }, [currentIndex, setCurrentIndex, totalItems, scrollAreaRef, isNavigating]);

  return { handleNavigate };
}
