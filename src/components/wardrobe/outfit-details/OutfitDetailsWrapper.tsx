import React, { useState } from 'react';
import { Outfit, ClothingItem } from '../types';
import DeleteOutfitDialog from "@/components/clothing-details/DeleteOutfitDialog";
import ImageZoom from "@/components/wardrobe/ImageZoom";
import {
  OutfitHeader,
  OutfitImage,
  OutfitDetails,
  OutfitItems,
  DeleteOutfitButton
} from "@/components/wardrobe/outfit-details";
import { loadOutfitWearDates } from "@/hooks/wardrobe/storage";

interface OutfitDetailsWrapperProps {
  outfit: Outfit;
  onDelete?: (id: string) => void;
  onItemClick?: (item: ClothingItem) => void;
  onImageUpdate?: (outfitId: string, imageUrl: string) => void;
  dismissProgress?: number;
}

const OutfitDetailsWrapper = ({ 
  outfit, 
  onDelete, 
  onItemClick, 
  onImageUpdate,
  dismissProgress = 0
}: OutfitDetailsWrapperProps) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false);
  const [localImageUrl, setLocalImageUrl] = useState<string | undefined>(outfit.imageUrl);
  
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleImageClick = () => {
    if (localImageUrl) {
      setIsImageZoomOpen(true);
    }
  };
  
  const handleItemClick = (item: ClothingItem) => {
    console.log("Item clicked in OutfitDetailsWrapper:", item.name);
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

  const getOutfitColorPalette = (outfit: Outfit) => {
    return outfit.items.map(item => item.color);
  };

  const creationDate = outfit.createdAt ? new Date(outfit.createdAt) : new Date();
  const wornDates = loadOutfitWearDates(outfit.id);

  return (
    <div className="flex flex-col h-[100dvh]">
      <OutfitHeader 
        outfitName={outfit.name}
        outfitId={outfit.id}
        itemCount={outfit.items.length}
        dismissProgress={dismissProgress}
      />
      
      <div className="flex-1 overflow-y-auto overscroll-bounce p-6 pb-4">
        <div className="space-y-6">
          <OutfitImage 
            imageUrl={localImageUrl} 
            outfitId={outfit.id}
            onImageClick={handleImageClick}
            onImageUpdate={onImageUpdate}
          />
          
          <OutfitDetails 
            creationDate={creationDate}
            season={outfit.season || 'All Seasons'}
            colorPalette={getOutfitColorPalette(outfit)}
            outfitId={outfit.id}
            wornDates={wornDates}
          />
          
          <OutfitItems 
            items={outfit.items}
            onItemClick={handleItemClick}
          />
          
          {onDelete && (
            <div className="mt-6 mb-4">
              <DeleteOutfitButton onDeleteClick={handleDeleteClick} />
            </div>
          )}
        </div>
      </div>
      
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

export default OutfitDetailsWrapper;
