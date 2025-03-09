
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
import { loadOutfits, saveOutfits } from "@/hooks/wardrobe/wardrobe-storage";

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
  const [wornDates, setWornDates] = useState<Date[]>(() => {
    // We need to ensure we're using the latest outfit data from storage
    const allOutfits = loadOutfits();
    const currentOutfit = allOutfits.find(o => o.id === outfit.id) || outfit;
    
    if (currentOutfit.metadata?.wornDates) {
      return currentOutfit.metadata.wornDates.map(dateStr => new Date(dateStr));
    }
    
    const dates: Date[] = [];
    
    // Add creation date as first worn date
    if (currentOutfit.createdAt) {
      dates.push(new Date(currentOutfit.createdAt));
    }
    
    // Add any dates from item metadata
    currentOutfit.items.forEach(item => {
      if (item.metadata?.dateTaken) {
        dates.push(new Date(item.metadata.dateTaken));
      }
    });
    
    // Remove duplicate dates by converting to string and using Set
    const uniqueDatesStr = [...new Set(dates.map(date => date.toISOString()))];
    
    // Convert back to Date objects
    return uniqueDatesStr.map(dateStr => new Date(dateStr));
  });
  
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
    setWornDates(prevDates => {
      const updatedDates = prevDates.filter(date => 
        date.getTime() !== dateToDelete.getTime()
      );
      
      // Save to storage
      saveWornDatesToStorage(updatedDates);
      
      return updatedDates;
    });
    
    console.log(`Deleted wear date: ${dateToDelete.toLocaleDateString()}`);
  };
  
  const handleAddWornDate = (newDate: Date) => {
    // Check if date already exists to prevent duplicates
    const dateExists = wornDates.some(date => 
      date.toDateString() === newDate.toDateString()
    );
    
    if (!dateExists) {
      setWornDates(prevDates => {
        const updatedDates = [...prevDates, newDate];
        
        // Save to storage
        saveWornDatesToStorage(updatedDates);
        
        return updatedDates;
      });
      console.log(`Added wear date: ${newDate.toLocaleDateString()}`);
    } else {
      console.log(`Date already exists: ${newDate.toLocaleDateString()}`);
    }
  };
  
  const saveWornDatesToStorage = (dates: Date[]) => {
    // Get all outfits from storage
    const allOutfits = loadOutfits();
    
    // Find and update the current outfit
    const updatedOutfits = allOutfits.map(existingOutfit => {
      if (existingOutfit.id === outfit.id) {
        // Create a metadata object if it doesn't exist
        const updatedOutfit = { 
          ...existingOutfit,
          metadata: existingOutfit.metadata || {} 
        };
        
        // Save the dates as strings
        updatedOutfit.metadata.wornDates = dates.map(date => date.toISOString());
        
        return updatedOutfit;
      }
      return existingOutfit;
    });
    
    // Save all outfits back to storage
    saveOutfits(updatedOutfits);
  };

  const creationDate = outfit.createdAt ? new Date(outfit.createdAt) : new Date();

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
          
          <OutfitDetailsSection 
            creationDate={creationDate}
            season={outfit.season || 'All Seasons'}
            colorPalette={getOutfitColorPalette(outfit)}
            wornDates={wornDates}
            onDeleteWornDate={handleDeleteWornDate}
            onAddWornDate={handleAddWornDate}
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

export default OutfitDetails;
