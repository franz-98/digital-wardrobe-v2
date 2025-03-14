
import { useCallback } from "react";

export function useNavigation(
  currentIndex: number,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
  totalItems: number
) {
  const handleNavigate = useCallback((directionOrPage: 'prev' | 'next' | number) => {
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
