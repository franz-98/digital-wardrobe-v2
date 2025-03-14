
import React from "react";
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
    <div className="flex-1 overflow-hidden flex flex-col" style={{ minHeight: '280px', maxHeight: 'calc(60vh - 120px)' }}>
      <div 
        className="flex-1 w-full h-full overflow-y-auto px-1 pb-1" 
        ref={scrollAreaRef}
        style={{ 
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
          touchAction: 'pan-y',
          scrollBehavior: 'smooth'
        }}
      >
        <div className="space-y-6 py-2 pb-6">
          <div className="opacity-100 transition-opacity duration-150">
            <InferredItemDisplay 
              item={currentItem}
              onFieldChange={onFieldChange}
              clothingCategories={clothingCategories}
            />
          </div>
          
          {/* Show visual indication that an item has been confirmed */}
          {isConfirmed && (
            <div className="text-green-600 text-center text-sm mt-4">
              ✓ Questo articolo è stato confermato
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDisplaySection;
