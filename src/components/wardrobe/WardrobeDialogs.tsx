
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ClothingItemDetails from "@/components/ClothingItemDetails";
import OutfitDetails from "@/components/wardrobe/OutfitDetails";
import { ClothingItem, Outfit } from "@/components/wardrobe/types";

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
  handleDeleteOutfit
}: WardrobeDialogsProps) => {
  
  const handleOutfitItemClick = (item: ClothingItem) => {
    // Switch from outfit view to item view
    setSelectedItem(item);
    setIsDetailsOpen(true);
    setIsOutfitDetailsOpen(false);
  };
  
  const setSelectedItem = (item: ClothingItem | null) => {
    // This is a local function to help with state management
    // The actual state is managed in the parent component
    if (item) {
      setIsDetailsOpen(true);
    }
  };
  
  return (
    <>
      {selectedItem && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="p-0 max-w-none w-full h-full sm:rounded-none">
            <ClothingItemDetails
              item={selectedItem}
              open={isDetailsOpen}
              onOpenChange={setIsDetailsOpen}
              relatedOutfits={findRelatedOutfits(selectedItem.id)}
              onDelete={handleDeleteItem}
              onOutfitDelete={handleDeleteOutfit}
            />
          </DialogContent>
        </Dialog>
      )}
      
      {selectedOutfit && (
        <Dialog open={isOutfitDetailsOpen} onOpenChange={setIsOutfitDetailsOpen}>
          <DialogContent className="p-0 max-w-none w-full h-full sm:rounded-none">
            <OutfitDetails 
              outfit={selectedOutfit} 
              onDelete={handleDeleteOutfit}
              onItemClick={handleOutfitItemClick}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default WardrobeDialogs;
