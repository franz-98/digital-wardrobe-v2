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
  const [wornDates, setWornDates] = useState<Date[]>(() => getWornDates());
  
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
    setWornDates(prevDates => prevDates.filter(date => 
      date.getTime() !== dateToDelete.getTime()
    ));
    
    console.log(`Deleted wear date: ${dateToDelete.toLocaleDateString()}`);
  };
  
  const handleAddWornDate = (newDate: Date) => {
    const dateExists = wornDates.some(date => 
      date.toDateString() === newDate.toDateString()
    );
    
    if (!dateExists) {
      setWornDates(prevDates => [...prevDates, newDate]);
      console.log(`Added wear date: ${newDate.toLocaleDateString()}`);
    } else {
      console.log(`Date already exists: ${newDate.toLocaleDateString()}`);
    }
  };

  const getOutfitColorPalette = () => {
    return outfit.items.map(item => item.color);
  };

  const creationDate = outfit.createdAt ? new Date(outfit.createdAt) : new Date();
  
  function getWornDates(): Date[] {
    const dates: Date[] = [];
    
    if (outfit.createdAt) {
      dates.push(new Date(outfit.createdAt));
    }
    
    outfit.items.forEach(item => {
      if (item.metadata?.dateTaken) {
        dates.push(new Date(item.metadata.dateTaken));
      }
    });
    
    const uniqueDatesStr = [...new Set(dates.map(date => date.toISOString()))];
    
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
