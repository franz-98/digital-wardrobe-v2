
import { useState } from "react";
import { DialogHeader } from "@/components/ui/dialog";
import { Outfit } from "@/components/wardrobe/types";
import ImageZoom from "@/components/wardrobe/ImageZoom";
import { 
  OutfitHeader, 
  OutfitImage, 
  OutfitItemsList, 
  DeleteOutfitButton 
} from "@/components/clothing-details/outfit-view";

interface OutfitViewProps {
  outfit: Outfit;
  onBackClick: () => void;
  onDeleteClick?: () => void;
  onItemClick?: (itemId: string) => void;
  onImageClick?: (imageUrl: string) => void;
}

const OutfitView = ({ 
  outfit, 
  onBackClick, 
  onDeleteClick, 
  onItemClick, 
  onImageClick 
}: OutfitViewProps) => {
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false);
  
  const handleImageClick = () => {
    if (onImageClick) {
      onImageClick(outfit.imageUrl || outfit.items[0]?.imageUrl || "");
    } else {
      setIsImageZoomOpen(true);
    }
  };

  const handleItemClick = (itemId: string) => {
    console.log("Item clicked in outfit view:", itemId);
    if (onItemClick) {
      onItemClick(itemId);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh]">
      <DialogHeader>
        <OutfitHeader 
          outfitName={outfit.name}
          itemCount={outfit.items.length}
          onBackClick={onBackClick}
        />
      </DialogHeader>
      
      <div className="flex-1 overflow-y-auto overscroll-bounce">
        <OutfitImage 
          imageUrl={outfit.imageUrl || outfit.items[0]?.imageUrl}
          onImageClick={handleImageClick}
        />
        
        <OutfitItemsList 
          items={outfit.items}
          onItemClick={handleItemClick}
        />
      </div>
      
      {onDeleteClick && (
        <DeleteOutfitButton onDeleteClick={onDeleteClick} />
      )}
      
      <ImageZoom 
        imageUrl={outfit.imageUrl || outfit.items[0]?.imageUrl || ""}
        alt={outfit.name}
        isOpen={isImageZoomOpen}
        onClose={() => setIsImageZoomOpen(false)}
      />
    </div>
  );
};

export default OutfitView;
