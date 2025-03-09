
import { useState } from "react";
import { ClothingItem, Outfit } from "@/components/wardrobe/types";

export function useItemClick() {
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const handleItemClick = (item: ClothingItem) => {
    console.log("handleItemClick called with item:", item.name);
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };

  return {
    selectedItem,
    setSelectedItem,
    isDetailsOpen,
    setIsDetailsOpen,
    handleItemClick
  };
}
