
import { useState } from "react";
import { X } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { ClothingItem, Outfit } from "@/components/wardrobe/types";
import DeleteConfirmationDialog from "./clothing-details/DeleteConfirmationDialog";
import DeleteOutfitDialog from "./clothing-details/DeleteOutfitDialog";
import ItemDetails from "./clothing-details/ItemDetails";
import RelatedOutfits from "./clothing-details/RelatedOutfits";
import OutfitView from "./clothing-details/OutfitView";
import ImageZoom from "@/components/wardrobe/ImageZoom";

interface ClothingItemDetailsProps {
  item: ClothingItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  relatedOutfits?: Outfit[];
  onDelete?: (id: string) => void;
  onOutfitDelete?: (id: string) => void;
  onOutfitClick?: (outfit: Outfit) => void;
}

const ClothingItemDetails = ({ 
  item, 
  open, 
  onOpenChange,
  relatedOutfits = [],
  onDelete,
  onOutfitDelete,
  onOutfitClick
}: ClothingItemDetailsProps) => {
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [viewMode, setViewMode] = useState<"item" | "outfit">("item");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showOutfitDeleteConfirmation, setShowOutfitDeleteConfirmation] = useState(false);
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false);
  const [zoomImageUrl, setZoomImageUrl] = useState("");
  
  if (!item) return null;

  const handleOutfitClick = (outfit: Outfit) => {
    if (onOutfitClick) {
      console.log("Outfit click handler triggered, navigating to outfit:", outfit.name);
      // Close the current dialog and trigger the parent's outfit click handler
      onOpenChange(false);
      onOutfitClick(outfit);
      return;
    }
    
    // Fallback to local state navigation within the component
    setSelectedOutfit(outfit);
    setViewMode("outfit");
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
  
  const handleImageClick = (imageUrl: string) => {
    setZoomImageUrl(imageUrl);
    setIsImageZoomOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(isOpen) => {
        // Only allow the parent dialog to close if delete confirmation is not showing
        if (!showDeleteConfirmation && !showOutfitDeleteConfirmation) {
          onOpenChange(isOpen);
        }
      }}>
        <DialogContent 
          className="p-0 overflow-hidden bg-background max-w-none w-full h-[100dvh] sm:rounded-none flex flex-col"
          enableDismissOnScroll={!showDeleteConfirmation && !showOutfitDeleteConfirmation && viewMode === "item"}
        >
          {viewMode === "outfit" && selectedOutfit ? (
            <OutfitView 
              outfit={selectedOutfit}
              onBackClick={handleBackToItem}
              onDeleteClick={onOutfitDelete ? handleDeleteOutfit : undefined}
              onItemClick={(itemId) => {
                console.log("Item clicked in outfit view:", itemId);
              }}
              onImageClick={handleImageClick}
            />
          ) : (
            <>
              <DialogHeader className="px-4 pt-4 pb-0 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-lg font-semibold">{item.name}</DialogTitle>
                  <DialogClose asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </DialogClose>
                </div>
                <DialogDescription>
                  View details and related outfits
                </DialogDescription>
              </DialogHeader>
              
              <div className="flex-1 overflow-y-auto overscroll-contain">
                <ItemDetails 
                  item={item}
                  onDeleteClick={handleDeleteItem}
                  onDelete={onDelete}
                  onImageClick={handleImageClick}
                />
                
                <div className="px-4 pb-4">
                  <RelatedOutfits 
                    relatedOutfits={relatedOutfits} 
                    onOutfitClick={handleOutfitClick}
                  />
                </div>
              </div>

              {onDelete && (
                <div className="p-4 border-t flex-shrink-0">
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
            </>
          )}
        </DialogContent>
      </Dialog>

      {onDelete && item && (
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
      
      <ImageZoom 
        imageUrl={zoomImageUrl || item.imageUrl}
        alt={item.name}
        isOpen={isImageZoomOpen}
        onClose={() => setIsImageZoomOpen(false)}
      />
    </>
  );
};

export default ClothingItemDetails;
