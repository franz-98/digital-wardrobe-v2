
import * as React from "react";

interface UseDismissOnScrollOptions {
  enableDismissOnScroll?: boolean;
  onDismiss?: (event: Event) => void;
  dismissThreshold?: number;
  onProgressChange?: (progress: number) => void;
}

export function useDismissOnScroll(
  ref: React.RefObject<HTMLElement>,
  options: UseDismissOnScrollOptions
) {
  const { 
    enableDismissOnScroll = false, 
    onDismiss, 
    dismissThreshold = 50,  // Default threshold in pixels
    onProgressChange 
  } = options;
  
  const [scrollStartY, setScrollStartY] = React.useState<number | null>(null);
  const [isAtTop, setIsAtTop] = React.useState(true);
  const [dismissProgress, setDismissProgress] = React.useState(0);

  React.useEffect(() => {
    if (!enableDismissOnScroll || !ref.current || !onDismiss) return;
    
    // Touch event handlers
    const handleTouchStart = (e: TouchEvent) => {
      setScrollStartY(e.touches[0].clientY);
      updateIsAtTop();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (scrollStartY === null || !isAtTop) return;
      
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - scrollStartY;
      
      // Calculate progress (0-100%)
      const progress = Math.min(Math.max(0, (deltaY / dismissThreshold) * 100), 100);
      setDismissProgress(progress);
      
      // Notify parent component of progress
      if (onProgressChange) {
        onProgressChange(progress);
      }
      
      // If scrolling down past threshold when already at top of content
      if (deltaY > dismissThreshold) {
        // Reset progress before dismissing
        setDismissProgress(0);
        // We're at the top and pulling down, so dismiss
        onDismiss(e);
      }
    };

    const handleTouchEnd = () => {
      setScrollStartY(null);
      setDismissProgress(0);
      if (onProgressChange) {
        onProgressChange(0);
      }
    };

    // Mouse wheel handler
    const handleWheel = (e: WheelEvent) => {
      updateIsAtTop();
      
      // For wheel events, we'll just use instantaneous values
      // rather than accumulated ones
      let progress = 0;
      
      // Only process wheel events if we're at the top and scrolling down (negative deltaY)
      if (isAtTop && e.deltaY < 0) {
        // Calculate progress based on a single wheel event
        // Using a fraction of the threshold since wheel events are smaller
        progress = Math.min(Math.max(0, (-e.deltaY / (dismissThreshold / 2)) * 100), 100);
        setDismissProgress(progress);
        
        if (onProgressChange) {
          onProgressChange(progress);
        }
        
        if (-e.deltaY > dismissThreshold) {
          setDismissProgress(0);
          onDismiss(e);
        }
      } else {
        setDismissProgress(0);
        if (onProgressChange) {
          onProgressChange(0);
        }
      }
    };

    // Check if the content is at the top
    const updateIsAtTop = () => {
      if (ref.current) {
        setIsAtTop(ref.current.scrollTop <= 0);
      }
    };

    const element = ref.current;
    
    // Add event listeners
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('wheel', handleWheel);
    element.addEventListener('scroll', updateIsAtTop, { passive: true });

    // Initial check
    updateIsAtTop();

    return () => {
      // Clean up event listeners
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('wheel', handleWheel);
      element.removeEventListener('scroll', updateIsAtTop);
    };
  }, [enableDismissOnScroll, scrollStartY, isAtTop, onDismiss, onProgressChange, dismissThreshold, ref]);

  return { dismissProgress };
}
