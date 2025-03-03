
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { ClothingItem, Outfit } from "@/components/wardrobe/types";
import DeleteConfirmationDialog from "./clothing-details/DeleteConfirmationDialog";
import DeleteOutfitDialog from "./clothing-details/DeleteOutfitDialog";
import ItemDetails from "./clothing-details/ItemDetails";
import RelatedOutfits from "./clothing-details/RelatedOutfits";
import OutfitView from "./clothing-details/OutfitView";

interface ClothingItemDetailsProps {
  item: ClothingItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  relatedOutfits?: Outfit[];
  onDelete?: (id: string) => void;
  onOutfitDelete?: (id: string) => void;
}

const ClothingItemDetails = ({ 
  item, 
  open, 
  onOpenChange,
  relatedOutfits = [],
  onDelete,
  onOutfitDelete
}: ClothingItemDetailsProps) => {
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [viewMode, setViewMode] = useState<"item" | "outfit">("item");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showOutfitDeleteConfirmation, setShowOutfitDeleteConfirmation] = useState(false);
  
  if (!item) return null;

  const handleOutfitClick = (outfit: Outfit) => {
    setSelectedOutfit(outfit);
    setViewMode("outfit");
    // Removed toast notification
  };

  const handleBackToItem = () => {
    setViewMode("item");
    setSelectedOutfit(null);
  };

  const handleDeleteItem = () => {
    setShowDeleteConfirmation(true);
  };
  
  const handleDeleteOutfit = () => {
    if (selectedOutfit && onOutfitDelete) {
      setShowOutfitDeleteConfirmation(true);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="p-0 overflow-hidden bg-background max-w-none w-full h-[100dvh] sm:rounded-none">
          {viewMode === "outfit" && selectedOutfit ? (
            <OutfitView 
              outfit={selectedOutfit}
              onBackClick={handleBackToItem}
              onDeleteClick={onOutfitDelete ? handleDeleteOutfit : undefined}
              onItemClick={item => {
                setViewMode("item");
                setSelectedOutfit(null);
              }}
            />
          ) : (
            <div className="flex flex-col h-full">
              <DialogHeader className="px-4 pt-4 pb-0">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-lg font-semibold">{item.name}</DialogTitle>
                  <DialogClose asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </DialogClose>
                </div>
              </DialogHeader>
              
              <div className="flex-1 overflow-y-auto overscroll-bounce">
                <ItemDetails 
                  item={item}
                  onDeleteClick={handleDeleteItem}
                  onDelete={onDelete}
                />
                
                <div className="px-4 pb-4">
                  <RelatedOutfits 
                    relatedOutfits={relatedOutfits} 
                    onOutfitClick={handleOutfitClick}
                  />
                </div>
              </div>

              {onDelete && (
                <div className="p-4 border-t">
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={handleDeleteItem}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Delete Item
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {onDelete && (
        <DeleteConfirmationDialog
          item={item}
          showDeleteConfirmation={showDeleteConfirmation}
          setShowDeleteConfirmation={setShowDeleteConfirmation}
          relatedOutfits={relatedOutfits}
          onDelete={onDelete}
          onOpenChange={onOpenChange}
        />
      )}
      
      {selectedOutfit && onOutfitDelete && (
        <DeleteOutfitDialog
          outfit={selectedOutfit}
          showDeleteConfirmation={showOutfitDeleteConfirmation}
          setShowDeleteConfirmation={setShowOutfitDeleteConfirmation}
          onDelete={onOutfitDelete}
        />
      )}
    </>
  );
};

export default ClothingItemDetails;
