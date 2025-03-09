
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ClothingItem, Outfit } from "@/components/wardrobe/types";
import { 
  OutfitHeader, 
  OutfitImage, 
  OutfitItemsList,
  OutfitDetails,
  DeleteOutfitButton 
} from "@/components/clothing-details/outfit-view";

interface OutfitViewProps {
  outfit: Outfit;
  onBackClick: () => void;
  onDeleteClick?: () => void;
  onItemClick?: (itemId: string) => void;
  onImageClick?: (imageUrl: string) => void;
  dismissProgress?: number;
}

const OutfitView = ({ 
  outfit, 
  onBackClick, 
  onDeleteClick,
  onItemClick,
  onImageClick,
  dismissProgress = 0
}: OutfitViewProps) => {
  const handleItemClick = (itemId: string) => {
    console.log("Item clicked in OutfitView:", itemId);
    
    if (onItemClick) {
      onItemClick(itemId);
    }
  };

  const handleImageClick = () => {
    const imageUrl = outfit.imageUrl || outfit.items[0]?.imageUrl;
    if (imageUrl && onImageClick) {
      onImageClick(imageUrl);
    }
  };

  const getOutfitColorPalette = () => {
    return outfit.items.map(item => item.color);
  };

  const creationDate = outfit.createdAt ? new Date(outfit.createdAt) : new Date();
  
  // Extract dates when outfit was worn
  const getWornDates = (): Date[] => {
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
        onBackClick={onBackClick}
      />
      
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <OutfitImage 
          imageUrl={outfit.imageUrl || outfit.items[0]?.imageUrl}
          onImageClick={handleImageClick}
        />
        
        <OutfitDetails 
          creationDate={creationDate}
          season={outfit.season || 'All Seasons'}
          colorPalette={getOutfitColorPalette()}
          wornDates={getWornDates()}
        />
        
        <OutfitItemsList 
          items={outfit.items}
          onItemClick={handleItemClick}
        />
      </div>
      
      {onDeleteClick && (
        <DeleteOutfitButton onDeleteClick={onDeleteClick} />
      )}
    </div>
  );
};

export default OutfitView;
