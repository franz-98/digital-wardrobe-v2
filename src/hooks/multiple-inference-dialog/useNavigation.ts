
import { ItemInference } from "@/components/home/types";

export function useNavigation(
  currentIndex: number,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
  totalItems: number,
  scrollAreaRef: React.RefObject<HTMLDivElement>,
  isNavigating: React.MutableRefObject<boolean>
) {
  const handleNavigate = (direction: 'prev' | 'next') => {
    // Prevent multiple rapid navigations
    if (isNavigating.current) {
      console.log("Navigation blocked: already navigating");
      return;
    }
    
    isNavigating.current = true;
    console.log(`Navigation started: ${direction}, current index: ${currentIndex}`);
    
    // Calculate the new index based on direction
    let newIndex = currentIndex;
    if (direction === 'prev' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (direction === 'next' && currentIndex < totalItems - 1) {
      newIndex = currentIndex + 1;
    } else {
      // If no change needed, reset the navigating flag and return
      console.log("Navigation canceled: no valid direction to navigate");
      isNavigating.current = false;
      return;
    }
    
    console.log(`Navigating from ${currentIndex} to ${newIndex}`);
    
    // Update the current index
    setCurrentIndex(newIndex);
    
    // Reset scroll position and allow navigation again after a short delay
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0;
    }
    
    // Allow navigation again after a short delay
    setTimeout(() => {
      console.log("Navigation completed, ready for next navigation");
      isNavigating.current = false;
    }, 300);
  };

  return { handleNavigate };
}
