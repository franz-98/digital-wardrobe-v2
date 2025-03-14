
import React from "react";
import { ItemInference } from "../types";
import { InferredItemDisplay } from "./index";

interface ItemDisplaySectionProps {
  currentItem: ItemInference;
  onFieldChange: (field: keyof ItemInference, value: string) => void;
  clothingCategories: string[];
  isConfirmed: boolean;
}

const ItemDisplaySection = ({
  currentItem,
  onFieldChange,
  clothingCategories,
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
    <div className="flex-1 mb-4 overflow-y-auto">
      <div className="space-y-4 py-2">
        <InferredItemDisplay 
          item={currentItem}
          onFieldChange={onFieldChange}
          clothingCategories={clothingCategories}
        />
        
        {isConfirmed && (
          <div className="text-green-600 text-center text-sm mt-2">
            ✓ Questo articolo è stato confermato
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDisplaySection;
