
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
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import DeleteOutfitDialog from "./DeleteOutfitDialog";
import ItemDetails from "./ItemDetails";
import RelatedOutfits from "./RelatedOutfits";
import OutfitView from "./OutfitView";
import ImageZoom from "@/components/wardrobe/ImageZoom";
import ItemDetailsContent from "./ItemDetailsContent";

interface ItemDetailsDialogProps {
  item: ClothingItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  relatedOutfits?: Outfit[];
  onDelete?: (id: string) => void;
  onOutfitDelete?: (id: string) => void;
  onOutfitClick?: (outfit: Outfit) => void;
}

const ItemDetailsDialog = ({ 
  item, 
  open, 
  onOpenChange,
  relatedOutfits = [],
  onDelete,
  onOutfitDelete,
  onOutfitClick
}: ItemDetailsDialogProps) => {
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [viewMode, setViewMode] = useState<"item" | "outfit">("item");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showOutfitDeleteConfirmation, setShowOutfitDeleteConfirmation] = useState(false);
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false);
  const [zoomImageUrl, setZoomImageUrl] = useState("");
  const [dismissProgress, setDismissProgress] = useState(0);
  
  if (!item) return null;

  const handleOutfitClick = (outfit: Outfit) => {
    console.log("handleOutfitClick called with outfit:", outfit);
    
    if (onOutfitClick) {
      console.log("Using external onOutfitClick handler");
      
      // First directly close the current dialog to avoid UI conflicts
      onOpenChange(false);
      
      // Then immediately invoke the outfit click handler
      onOutfitClick(outfit);
      
      return;
    }
    
    // Fallback to local state navigation within the component
    console.log("Using internal outfit navigation");
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
          dismissThreshold={70}
          showDismissIndicator={true}
          onProgressChange={setDismissProgress}
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
            <ItemDetailsContent 
              item={item}
              relatedOutfits={relatedOutfits}
              onDelete={onDelete}
              dismissProgress={dismissProgress}
              onDeleteClick={handleDeleteItem}
              onOutfitClick={handleOutfitClick}
              onImageClick={handleImageClick}
            />
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

export default ItemDetailsDialog;
