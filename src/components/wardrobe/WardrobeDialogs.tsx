
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
  handleOutfitItemClick: (itemId: string) => void;
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
  handleOutfitItemClick
}: WardrobeDialogsProps) => {
  
  const handleOutfitClick = (outfit: Outfit) => {
    // Close the item dialog and open the outfit dialog
    setIsDetailsOpen(false);
    setTimeout(() => {
      handleOutfitClick(outfit);
    }, 100);
  };
  
  const handleOutfitClickInternal = (outfit: Outfit) => {
    setIsDetailsOpen(false);
    setTimeout(() => {
      setIsOutfitDetailsOpen(true);
    }, 100);
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
              onOutfitClick={handleOutfitClickInternal}
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
              onItemClick={(item) => {
                setIsOutfitDetailsOpen(false);
                handleOutfitItemClick(item.id);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default WardrobeDialogs;
