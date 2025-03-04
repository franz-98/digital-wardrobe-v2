
import * as React from "react";

interface UseDismissOnScrollOptions {
  enableDismissOnScroll?: boolean;
  onDismiss?: (event: Event) => void;
}

export function useDismissOnScroll(
  ref: React.RefObject<HTMLElement>,
  options: UseDismissOnScrollOptions
) {
  const { enableDismissOnScroll = false, onDismiss } = options;
  const [scrollStartY, setScrollStartY] = React.useState<number | null>(null);
  const [isAtTop, setIsAtTop] = React.useState(true);
  const dismissThreshold = 50; // pixels to trigger dismiss

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
      
      // If scrolling down past threshold when already at top of content
      if (deltaY > dismissThreshold) {
        // We're at the top and pulling down, so dismiss
        onDismiss(e);
      }
    };

    const handleTouchEnd = () => {
      setScrollStartY(null);
    };

    // Mouse wheel handler
    const handleWheel = (e: WheelEvent) => {
      updateIsAtTop();
      
      // Only process wheel events if we're at the top and scrolling down
      if (isAtTop && e.deltaY < -dismissThreshold) {
        onDismiss(e);
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
  }, [enableDismissOnScroll, scrollStartY, isAtTop, onDismiss, ref]);
}
