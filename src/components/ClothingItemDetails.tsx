
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { ClothingItem, Outfit } from "@/components/wardrobe/types";
import DeleteConfirmationDialog from "./clothing-details/DeleteConfirmationDialog";
import ItemDetails from "./clothing-details/ItemDetails";
import RelatedOutfits from "./clothing-details/RelatedOutfits";
import OutfitView from "./clothing-details/OutfitView";

interface ClothingItemDetailsProps {
  item: ClothingItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  relatedOutfits?: Outfit[];
  onDelete?: (id: string) => void;
}

const ClothingItemDetails = ({ 
  item, 
  open, 
  onOpenChange,
  relatedOutfits = [],
  onDelete
}: ClothingItemDetailsProps) => {
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [viewMode, setViewMode] = useState<"item" | "outfit">("item");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (open) {
        onOpenChange(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [open, onOpenChange]);
  
  if (!item) return null;

  const handleOutfitClick = (outfit: Outfit) => {
    setSelectedOutfit(outfit);
    setViewMode("outfit");
    toast("Outfit selezionato", {
      description: `Hai selezionato l'outfit: ${outfit.name}`,
      duration: 1500,
    });
  };

  const handleBackToItem = () => {
    setViewMode("item");
    setSelectedOutfit(null);
  };

  const handleDeleteItem = () => {
    setShowDeleteConfirmation(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md overflow-auto bg-background p-0">
          {viewMode === "outfit" && selectedOutfit ? (
            <OutfitView 
              outfit={selectedOutfit}
              onBackClick={handleBackToItem}
            />
          ) : (
            <div className="flex flex-col h-full">
              <DialogHeader className="px-4 pt-4 pb-0">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-lg font-semibold">{item.name}</DialogTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onOpenChange(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </DialogHeader>
              
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
    </>
  );
};

export default ClothingItemDetails;
