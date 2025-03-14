
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
  
  const handlePrev = () => {
    console.log("Navigation: previous clicked");
    onNavigate('prev');
  };
  
  const handleNext = () => {
    console.log("Navigation: next clicked");
    onNavigate('next');
  };
  
  return (
    <div className="flex items-center justify-between text-sm py-2 mb-2">
      <span>Articolo {currentIndex + 1} di {totalItems}</span>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Articolo precedente"
          className="h-8 w-8 p-0 focus:ring-2"
          type="button"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleNext}
          disabled={currentIndex === totalItems - 1}
          aria-label="Articolo successivo"
          className="h-8 w-8 p-0 focus:ring-2"
          type="button"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default NavigationControls;
