
import { useCallback } from "react";

export function useNavigation(
  currentIndex: number,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
  totalItems: number,
  scrollAreaRef: React.RefObject<HTMLDivElement>,
  isNavigating: React.MutableRefObject<boolean>
) {
  const handleNavigate = useCallback((direction: 'prev' | 'next') => {
    // Prevent rapid multiple navigation clicks
    if (isNavigating.current) return;
    isNavigating.current = true;

    console.info(`Navigation started: ${direction}, current index: ${currentIndex}`);
    
    // Calculate next index based on direction
    const nextIndex = direction === 'prev' 
      ? Math.max(0, currentIndex - 1)
      : Math.min(totalItems - 1, currentIndex + 1);
    
    // Only update if it's a valid index change
    if (nextIndex !== currentIndex) {
      console.info(`Navigating from ${currentIndex} to ${nextIndex}`);
      setCurrentIndex(nextIndex);
      
      // Reset scroll position when navigating
      requestAnimationFrame(() => {
        if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollTop = 0;
        }
        
        // Allow navigation again after a short delay
        setTimeout(() => {
          isNavigating.current = false;
          console.info(`Navigation completed, ready for next navigation`);
        }, 150);
      });
    } else {
      isNavigating.current = false;
    }
  }, [currentIndex, setCurrentIndex, totalItems, scrollAreaRef, isNavigating]);

  return { handleNavigate };
}
