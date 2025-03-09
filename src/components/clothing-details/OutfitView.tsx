
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
import { loadOutfits, saveOutfits } from "@/hooks/wardrobe/wardrobe-storage";

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
  const [wornDates, setWornDates] = useState<Date[]>(() => {
    // We need to ensure we're using the latest outfit data from storage
    const allOutfits = loadOutfits();
    const currentOutfit = allOutfits.find(o => o.id === outfit.id) || outfit;
    
    if (currentOutfit.metadata?.wornDates) {
      return currentOutfit.metadata.wornDates.map(dateStr => new Date(dateStr));
    }
    
    const dates: Date[] = [];
    
    // Fall back to previous behavior if no saved dates
    if (currentOutfit.createdAt) {
      dates.push(new Date(currentOutfit.createdAt));
    }
    
    currentOutfit.items.forEach(item => {
      if (item.metadata?.dateTaken) {
        dates.push(new Date(item.metadata.dateTaken));
      }
    });
    
    const uniqueDatesStr = [...new Set(dates.map(date => date.toISOString()))];
    
    return uniqueDatesStr.map(dateStr => new Date(dateStr));
  });
  
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

  const getOutfitColorPalette = () => {
    return outfit.items.map(item => item.color);
  };

  const creationDate = outfit.createdAt ? new Date(outfit.createdAt) : new Date();

  return (
    <div className="flex flex-col h-[100dvh]">
      <OutfitHeader 
        outfitName={outfit.name}
        outfitId={outfit.id}
        itemCount={outfit.items.length}
        dismissProgress={dismissProgress}
        onBackClick={onBackClick}
      />
      
      <div className="flex-1 overflow-y-auto overscroll-contain pb-4">
        <OutfitImage 
          imageUrl={outfit.imageUrl || outfit.items[0]?.imageUrl}
          onImageClick={handleImageClick}
        />
        
        <OutfitDetails 
          creationDate={creationDate}
          season={outfit.season || 'All Seasons'}
          colorPalette={getOutfitColorPalette()}
          wornDates={wornDates}
          onDeleteWornDate={handleDeleteWornDate}
          onAddWornDate={handleAddWornDate}
        />
        
        <OutfitItemsList 
          items={outfit.items}
          onItemClick={handleItemClick}
        />
        
        {onDeleteClick && (
          <div className="px-4 pb-6 mt-4">
            <DeleteOutfitButton onDeleteClick={onDeleteClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OutfitView;
