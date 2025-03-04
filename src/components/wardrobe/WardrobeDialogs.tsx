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
    console.log("WardrobeDialogs - outfit clicked:", outfit);
    
    // Close item details dialog first to avoid UI conflicts
    setIsDetailsOpen(false);
    
    // Wait a small amount of time to allow the first dialog to close
    setTimeout(() => {
      console.log("Opening outfit detail:", outfit.name);
      
      // Find the selected outfit in the wardrobe context
      // and set it as the current outfit
      handleOutfitItemClick(outfit.id);
      
      // Open the outfit view
      setIsOutfitDetailsOpen(true);
    }, 800); // Increased delay to ensure smooth transition
  };
  
  const handleItemClickFromOutfit = (item: ClothingItem) => {
    console.log("Item clicked from outfit view:", item.name);
    
    // Close outfit details first
    setIsOutfitDetailsOpen(false);
    
    // Call the handler immediately without delay
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
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default WardrobeDialogs;
