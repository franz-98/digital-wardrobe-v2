
import React from "react";
import ClothingItemCard from "@/components/ClothingItemCard";
import { Shirt, Check } from "lucide-react";

interface ClothingItem {
  id: string;
  name: string;
  category: string;
  color: string;
  imageUrl: string;
  metadata?: {
    dateTaken?: string;
    brand?: string;
    material?: string;
    season?: string;
  };
}

interface ClothingTabProps {
  clothingItems: ClothingItem[];
  searchTerm: string;
  isCreatingOutfit: boolean;
  selectedItemsForOutfit: ClothingItem[];
  toggleItemSelection: (item: ClothingItem) => void;
  handleItemClick: (item: ClothingItem) => void;
  handleDeleteItem: (id: string) => void;
}

const ClothingTab = ({
  clothingItems,
  searchTerm,
  isCreatingOutfit,
  selectedItemsForOutfit,
  toggleItemSelection,
  handleItemClick,
  handleDeleteItem
}: ClothingTabProps) => {
  
  const filteredClothingItems = clothingItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {filteredClothingItems.map((item) => (
        <div key={item.id} className="relative">
          {isCreatingOutfit && (
            <button 
              className={`absolute top-2 left-2 z-10 rounded-full p-1 shadow-md ${
                selectedItemsForOutfit.some(i => i.id === item.id) 
                  ? "bg-primary text-white" 
                  : "bg-white/90"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleItemSelection(item);
              }}
            >
              {selectedItemsForOutfit.some(i => i.id === item.id) ? (
                <Check className="h-5 w-5" />
              ) : (
                <Shirt className="h-5 w-5 text-gray-500" />
              )}
            </button>
          )}
          <ClothingItemCard
            item={item}
            onClick={() => isCreatingOutfit ? toggleItemSelection(item) : handleItemClick(item)}
          />
        </div>
      ))}
    </div>
  );
};

export default ClothingTab;
