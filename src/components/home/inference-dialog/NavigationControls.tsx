
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationControlsProps {
  currentIndex: number;
  totalItems: number;
  onNavigate: (direction: 'prev' | 'next') => void;
  className?: string;
}

const NavigationControls = ({ 
  currentIndex, 
  totalItems,
  onNavigate,
  className
}: NavigationControlsProps) => {
  // Don't render if there's only one item
  if (totalItems <= 1) return null;
  
  // Counter text (e.g., "1 of 5")
  const counterText = `${currentIndex + 1} di ${totalItems}`;
  
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onNavigate('prev')}
        disabled={currentIndex === 0}
        className={cn(
          "h-9 w-9 rounded-full",
          currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 dark:hover:bg-gray-800"
        )}
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Previous</span>
      </Button>
      
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {counterText}
      </span>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onNavigate('next')}
        disabled={currentIndex === totalItems - 1}
        className={cn(
          "h-9 w-9 rounded-full",
          currentIndex === totalItems - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 dark:hover:bg-gray-800"
        )}
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Next</span>
      </Button>
    </div>
  );
};

export default NavigationControls;
