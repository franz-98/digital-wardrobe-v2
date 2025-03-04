
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
    // Chiudiamo prima la finestra di dialogo dei dettagli dell'elemento per evitare conflitti di UI
    setIsDetailsOpen(false);
    
    // Attendiamo un po' per consentire alla prima finestra di dialogo di chiudersi
    setTimeout(() => {
      // Questo verrà gestito dal componente padre attraverso handleOutfitClick
      console.log("Navigating to outfit:", outfit.name);
      
      // Impostiamo l'outfit selezionato tramite il genitore
      handleOutfitItemClick(outfit.id);
      
      // Apriamo la visualizzazione dell'outfit
      setIsOutfitDetailsOpen(true);
    }, 150);
  };
  
  return (
    <>
      {selectedItem && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="p-0 max-w-none w-full h-full sm:rounded-none">
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
          <DialogContent className="p-0 max-w-none w-full h-full sm:rounded-none">
            <DialogTitle className="sr-only">Outfit Details</DialogTitle>
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
