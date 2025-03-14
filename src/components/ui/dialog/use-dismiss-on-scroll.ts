
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
    dismissThreshold = 50,
    onProgressChange 
  } = options;
  
  const [scrollStartY, setScrollStartY] = React.useState<number | null>(null);
  const [isAtTop, setIsAtTop] = React.useState(true);
  const [dismissProgress, setDismissProgress] = React.useState(0);
  const scrollHandler = React.useRef<number | null>(null);

  React.useEffect(() => {
    // Don't set up any events if dismiss-on-scroll is disabled
    if (!enableDismissOnScroll || !ref.current || !onDismiss) {
      return;
    }
    
    // Touch event handlers
    const handleTouchStart = (e: TouchEvent) => {
      // Only track touch start if we're at the top of the content
      if (ref.current && ref.current.scrollTop <= 0) {
        setScrollStartY(e.touches[0].clientY);
        setIsAtTop(true);
      } else {
        setScrollStartY(null);
        setIsAtTop(false);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // If not at top or no starting point, don't handle dismiss
      if (scrollStartY === null || !isAtTop || (ref.current && ref.current.scrollTop > 0)) {
        if (dismissProgress > 0) {
          setDismissProgress(0);
          if (onProgressChange) onProgressChange(0);
        }
        return;
      }
      
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - scrollStartY;
      
      // Only handle pull-down gestures (positive deltaY)
      if (deltaY <= 0) {
        if (dismissProgress > 0) {
          setDismissProgress(0);
          if (onProgressChange) onProgressChange(0);
        }
        return;
      }
      
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
    element.addEventListener('scroll', updateIsAtTop, { passive: true });

    // Initial check
    updateIsAtTop();

    return () => {
      if (element) {
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchmove', handleTouchMove);
        element.removeEventListener('touchend', handleTouchEnd);
        element.removeEventListener('scroll', updateIsAtTop);
      }
      if (scrollHandler.current !== null) {
        window.clearTimeout(scrollHandler.current);
      }
    };
  }, [enableDismissOnScroll, scrollStartY, isAtTop, onDismiss, onProgressChange, dismissThreshold, ref, dismissProgress]);

  return { dismissProgress };
}
