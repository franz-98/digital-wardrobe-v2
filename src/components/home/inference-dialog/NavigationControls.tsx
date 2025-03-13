
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationControlsProps {
  currentIndex: number;
  totalItems: number;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const NavigationControls = ({ 
  currentIndex, 
  totalItems, 
  onNavigate 
}: NavigationControlsProps) => {
  // Handle touch gestures for swiping
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
  
  // Minimum distance required for swipe to register
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && currentIndex < totalItems - 1) {
      onNavigate('next');
    }
    
    if (isRightSwipe && currentIndex > 0) {
      onNavigate('prev');
    }
    
    // Reset touch coordinates
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (totalItems <= 1) return null;
  
  return (
    <div className="flex items-center justify-between text-sm">
      <span>Articolo {currentIndex + 1} di {totalItems}</span>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onNavigate('prev')}
          disabled={currentIndex === 0}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onNavigate('next')}
          disabled={currentIndex === totalItems - 1}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default NavigationControls;
