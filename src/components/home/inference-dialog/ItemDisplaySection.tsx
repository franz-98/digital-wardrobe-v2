
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ItemInference } from "../types";
import { InferredItemDisplay } from "./index";

interface ItemDisplaySectionProps {
  currentItem: ItemInference;
  onFieldChange: (field: keyof ItemInference, value: string) => void;
  clothingCategories: string[];
  scrollAreaRef: React.RefObject<HTMLDivElement>;
  isConfirmed: boolean;
}

const ItemDisplaySection = ({
  currentItem,
  onFieldChange,
  clothingCategories,
  scrollAreaRef,
  isConfirmed
}: ItemDisplaySectionProps) => {
  if (!currentItem) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>No item data available</p>
      </div>
    );
  }
  
  return (
    <div className="flex-1 overflow-hidden flex flex-col" style={{ minHeight: '280px', maxHeight: '60vh' }}>
      <ScrollArea className="flex-1 pr-1 h-full" scrollHideDelay={100}>
        <div className="space-y-4 py-2 pb-4" ref={scrollAreaRef}>
          <div className="opacity-100 transition-opacity duration-150">
            <InferredItemDisplay 
              item={currentItem}
              onFieldChange={onFieldChange}
              clothingCategories={clothingCategories}
            />
          </div>
          
          {/* Show visual indication that an item has been confirmed */}
          {isConfirmed && (
            <div className="text-green-600 text-center text-sm mt-2">
              ✓ Questo articolo è stato confermato
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ItemDisplaySection;
