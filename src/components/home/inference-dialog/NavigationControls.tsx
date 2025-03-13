
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  if (totalItems <= 1) return null;
  
  return (
    <div className="flex items-center justify-between text-sm">
      <span>Articolo {currentIndex + 1} di {totalItems}</span>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => onNavigate('prev')}
          disabled={currentIndex === 0}
          aria-label="Articolo precedente"
          className="h-9 w-9 touch-manipulation"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => onNavigate('next')}
          disabled={currentIndex === totalItems - 1}
          aria-label="Articolo successivo"
          className="h-9 w-9 touch-manipulation"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default NavigationControls;
