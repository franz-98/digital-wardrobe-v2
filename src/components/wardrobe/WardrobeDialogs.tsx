
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogTitle 
} from "@/components/ui/dialog";
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
  
  const handleOutfitClick = (outfit: Outfit) => {
    console.log("WardrobeDialogs - outfit clicked:", outfit);
    
    // First close item details dialog to avoid UI conflicts
    setIsDetailsOpen(false);
    
    // Process the outfit click immediately
    handleOutfitItemClick(outfit.id);
  };
  
  const handleItemClickFromOutfit = (item: ClothingItem) => {
    console.log("Item clicked from outfit view:", item.name);
    
    // Close outfit details
    setIsOutfitDetailsOpen(false);
    
    // Process the item click
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
          >
            <DialogTitle className="sr-only">Outfit Details</DialogTitle>
            <OutfitDetails 
              outfit={selectedOutfit} 
              onDelete={handleDeleteOutfit}
              onItemClick={handleItemClickFromOutfit}
              onImageUpdate={updateOutfitImage}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default WardrobeDialogs;
