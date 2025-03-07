
import React, { useState } from 'react';
import { Outfit, ClothingItem } from './types';
import DeleteOutfitDialog from "@/components/clothing-details/DeleteOutfitDialog";
import ImageZoom from "@/components/wardrobe/ImageZoom";
import {
  OutfitHeader,
  OutfitImage,
  OutfitDetails as OutfitDetailsSection,
  OutfitItems,
  DeleteOutfitButton
} from "@/components/wardrobe/outfit-details";

interface OutfitDetailsProps {
  outfit: Outfit;
  onDelete?: (id: string) => void;
  onItemClick?: (item: ClothingItem) => void;
  onImageUpdate?: (outfitId: string, imageUrl: string) => void;
}

const OutfitDetails = ({ outfit, onDelete, onItemClick, onImageUpdate }: OutfitDetailsProps) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false);
  const [dismissProgress, setDismissProgress] = useState(0);
  const [localImageUrl, setLocalImageUrl] = useState<string | undefined>(outfit.imageUrl);
  
  const getOutfitColorPalette = (outfit: Outfit) => {
    return outfit.items.map(item => item.color);
  };
  
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleImageClick = () => {
    if (localImageUrl) {
      setIsImageZoomOpen(true);
    }
  };
  
  const handleItemClick = (item: ClothingItem) => {
    console.log("Item clicked in OutfitDetails:", item.name);
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const handleImageUploaded = (imageUrl: string) => {
    setLocalImageUrl(imageUrl);
    if (onImageUpdate) {
      onImageUpdate(outfit.id, imageUrl);
    }
  };

  const creationDate = outfit.createdAt ? new Date(outfit.createdAt) : new Date();

  return (
    <div className="flex flex-col h-[100dvh]">
      <OutfitHeader 
        outfitName={outfit.name} 
        itemCount={outfit.items.length}
        dismissProgress={dismissProgress}
      />
      
      <div className="flex-1 overflow-y-auto overscroll-bounce p-6">
        <div className="space-y-6">
          <OutfitImage 
            imageUrl={localImageUrl} 
            outfitId={outfit.id}
            onImageClick={handleImageClick}
            onImageUpdate={onImageUpdate}
          />
          
          <OutfitDetailsSection 
            creationDate={creationDate}
            season={outfit.season || 'All Seasons'}
            colorPalette={getOutfitColorPalette(outfit)}
          />
          
          <OutfitItems 
            items={outfit.items}
            onItemClick={handleItemClick}
          />
        </div>
      </div>
      
      {onDelete && (
        <DeleteOutfitButton onDeleteClick={handleDeleteClick} />
      )}
      
      {onDelete && (
        <DeleteOutfitDialog
          outfit={outfit}
          showDeleteConfirmation={showDeleteConfirmation}
          setShowDeleteConfirmation={setShowDeleteConfirmation}
          onDelete={onDelete}
        />
      )}
      
      <ImageZoom 
        imageUrl={localImageUrl || (outfit.items[0]?.imageUrl || "")}
        alt={outfit.name}
        isOpen={isImageZoomOpen}
        onClose={() => setIsImageZoomOpen(false)}
      />
    </div>
  );
};

export default OutfitDetails;
