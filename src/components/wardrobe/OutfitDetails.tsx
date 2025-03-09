
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
  dismissProgress?: number;
}

const OutfitDetails = ({ 
  outfit, 
  onDelete, 
  onItemClick, 
  onImageUpdate,
  dismissProgress = 0
}: OutfitDetailsProps) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false);
  const [localImageUrl, setLocalImageUrl] = useState<string | undefined>(outfit.imageUrl);
  const [wornDates, setWornDates] = useState<Date[]>(() => getWornDates(outfit));
  
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

  const handleDeleteWornDate = (dateToDelete: Date) => {
    setWornDates(prevDates => prevDates.filter(date => 
      date.getTime() !== dateToDelete.getTime()
    ));
    
    // Here we could also update the outfit metadata if there was API integration
    console.log(`Deleted wear date: ${dateToDelete.toLocaleDateString()}`);
  };

  const creationDate = outfit.createdAt ? new Date(outfit.createdAt) : new Date();
  
  // Extract dates when outfit was worn
  function getWornDates(outfit: Outfit): Date[] {
    const dates: Date[] = [];
    
    // Add creation date as first worn date
    if (outfit.createdAt) {
      dates.push(new Date(outfit.createdAt));
    }
    
    // Add any dates from item metadata
    outfit.items.forEach(item => {
      if (item.metadata?.dateTaken) {
        dates.push(new Date(item.metadata.dateTaken));
      }
    });
    
    // Remove duplicate dates by converting to string and using Set
    const uniqueDatesStr = [...new Set(dates.map(date => date.toISOString()))];
    
    // Convert back to Date objects
    return uniqueDatesStr.map(dateStr => new Date(dateStr));
  };

  return (
    <div className="flex flex-col h-[100dvh]">
      <OutfitHeader 
        outfitName={outfit.name}
        outfitId={outfit.id}
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
            wornDates={wornDates}
            onDeleteWornDate={handleDeleteWornDate}
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
