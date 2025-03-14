
import { useCallback } from "react";

export function useNavigation(
  currentIndex: number,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
  totalItems: number,
  scrollAreaRef: React.RefObject<HTMLDivElement>,
  isNavigating: React.MutableRefObject<boolean>
) {
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
      nextIndex = directionOrPage === 'prev' 
        ? Math.max(0, currentIndex - 1)
        : Math.min(totalItems - 1, currentIndex + 1);
      console.log(`Directional navigation: ${directionOrPage}, from ${currentIndex + 1} to ${nextIndex + 1}`);
    }
    
    // Only update if it's a valid index change
    if (nextIndex !== currentIndex) {
      console.log(`Setting current index to ${nextIndex}`);
      setCurrentIndex(nextIndex);
      
      // Reset scroll position when navigating
      if (scrollAreaRef.current) {
        console.log("Resetting scroll position");
        scrollAreaRef.current.scrollTop = 0;
      }
      
      // Allow navigation again after a short delay
      setTimeout(() => {
        isNavigating.current = false;
        console.log("Navigation cooldown complete, ready for next navigation");
      }, 300);
    } else {
      console.log(`Navigation cancelled: already at ${nextIndex + 1}`);
      isNavigating.current = false;
    }
  }, [currentIndex, setCurrentIndex, totalItems, scrollAreaRef, isNavigating]);

  return { handleNavigate };
}
