
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
    <div className="flex items-center justify-between text-sm py-2 mb-2">
      <span className="text-xs sm:text-sm text-muted-foreground">Articolo {currentIndex + 1} di {totalItems}</span>
      <div className="flex space-x-1">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onNavigate('prev')}
          disabled={currentIndex === 0}
          aria-label="Articolo precedente"
          className="h-7 w-7 p-0 focus:ring-1"
          type="button"
        >
          <ChevronLeft className="h-3 w-3" />
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onNavigate('next')}
          disabled={currentIndex === totalItems - 1}
          aria-label="Articolo successivo"
          className="h-7 w-7 p-0 focus:ring-1"
          type="button"
        >
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default NavigationControls;
