
import React, { useState } from "react";
import ClothingItemCard from "@/components/ClothingItemCard";

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
              className="absolute top-1 left-1 z-10 rounded-full bg-white/90 p-0.5 shadow-sm"
              onClick={() => toggleItemSelection(item)}
            >
              {selectedItemsForOutfit.some(i => i.id === item.id) ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              ) : (
                <div className="h-4 w-4 rounded-full border-2" />
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
