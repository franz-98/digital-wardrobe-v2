
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogTitle 
} from "@/components/ui/dialog";
import ClothingItemDetails from "@/components/ClothingItemDetails";
import OutfitDetails from "@/components/wardrobe/OutfitDetails";
import { ClothingItem, Outfit } from "@/components/wardrobe/types";
import { loadOutfits, saveOutfits } from "@/hooks/wardrobe/wardrobe-storage";

interface WardrobeDialogsProps {
  selectedItem: ClothingItem | null;
  selectedOutfit: Outfit | null;
  isDetailsOpen: boolean;
  isOutfitDetailsOpen: boolean;
  setIsDetailsOpen: (open: boolean) => void;
  setIsOutfitDetailsOpen: (open: boolean) => void;
  findRelatedOutfits: (itemId: string) => Outfit[];
  handleDeleteItem: (itemId: string) => void;
  handleDeleteOutfit?: (outfitId: string) => void;
  handleOutfitItemClick: (itemId: string) => void;
  updateOutfitImage?: (outfitId: string, imageUrl: string) => void;
}

const WardrobeDialogs = ({
  selectedItem,
  selectedOutfit,
  isDetailsOpen,
  isOutfitDetailsOpen,
  setIsDetailsOpen,
  setIsOutfitDetailsOpen,
  findRelatedOutfits,
  handleDeleteItem,
  handleDeleteOutfit,
  handleOutfitItemClick,
  updateOutfitImage
}: WardrobeDialogsProps) => {
  const [itemDismissProgress, setItemDismissProgress] = useState(0);
  const [outfitDismissProgress, setOutfitDismissProgress] = useState(0);
  
  const [currentOutfitId, setCurrentOutfitId] = useState<string | null>(null);

  // On dialog open, store the outfit ID to ensure we save on close
  useEffect(() => {
    if (selectedOutfit && isOutfitDetailsOpen) {
      setCurrentOutfitId(selectedOutfit.id);
      
      // Make sure this outfit exists in storage
      const allOutfits = loadOutfits();
      if (!allOutfits.some(o => o.id === selectedOutfit.id)) {
        // Add this outfit to storage if it doesn't exist
        saveOutfits([...allOutfits, selectedOutfit]);
      }
    }
  }, [selectedOutfit, isOutfitDetailsOpen]);

  // On dialog close, ensure we save any changes
  useEffect(() => {
    if (!isOutfitDetailsOpen && currentOutfitId) {
      const allOutfits = loadOutfits();
      saveOutfits(allOutfits);
      setCurrentOutfitId(null);
    }
  }, [isOutfitDetailsOpen, currentOutfitId]);
  
  const handleOutfitClick = (outfit: Outfit) => {
    console.log("WardrobeDialogs - outfit clicked:", outfit);
    setIsDetailsOpen(false);
    handleOutfitItemClick(outfit.id);
  };
  
  const handleItemClickFromOutfit = (item: ClothingItem) => {
    console.log("Item clicked from outfit view:", item.name);
    setIsOutfitDetailsOpen(false);
    handleOutfitItemClick(item.id);
  };
  
  return (
    <>
      {selectedItem && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent 
            className="p-0 max-w-none w-full h-full sm:rounded-none" 
            enableDismissOnScroll={true}
            dismissThreshold={70}
            showDismissIndicator={true}
            onProgressChange={setItemDismissProgress}
          >
            <DialogTitle className="sr-only">Item Details</DialogTitle>
            <ClothingItemDetails
              item={selectedItem}
              open={isDetailsOpen}
              onOpenChange={setIsDetailsOpen}
              relatedOutfits={findRelatedOutfits(selectedItem.id)}
              onDelete={handleDeleteItem}
              onOutfitDelete={handleDeleteOutfit}
              onOutfitClick={handleOutfitClick}
              dismissProgress={itemDismissProgress}
            />
          </DialogContent>
        </Dialog>
      )}
      
      {selectedOutfit && (
        <Dialog open={isOutfitDetailsOpen} onOpenChange={setIsOutfitDetailsOpen}>
          <DialogContent 
            className="p-0 max-w-none w-full h-full sm:rounded-none" 
            enableDismissOnScroll={true}
            dismissThreshold={70}
            showDismissIndicator={true}
            onProgressChange={setOutfitDismissProgress}
          >
            <DialogTitle className="sr-only">Outfit Details</DialogTitle>
            <OutfitDetails 
              outfit={selectedOutfit} 
              onDelete={handleDeleteOutfit}
              onItemClick={handleItemClickFromOutfit}
              onImageUpdate={updateOutfitImage}
              dismissProgress={outfitDismissProgress}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default WardrobeDialogs;
