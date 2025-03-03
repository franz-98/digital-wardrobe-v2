
import React, { useState } from 'react';
import { Shirt, X, Trash2, ZoomIn } from "lucide-react";
import { DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Outfit, ClothingItem } from './types';
import DeleteOutfitDialog from "@/components/clothing-details/DeleteOutfitDialog";
import ImageZoom from "@/components/wardrobe/ImageZoom";

interface OutfitDetailsProps {
  outfit: Outfit;
  onDelete?: (id: string) => void;
  onItemClick?: (item: ClothingItem) => void;
}

const OutfitDetails = ({ outfit, onDelete, onItemClick }: OutfitDetailsProps) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false);
  
  const getOutfitColorPalette = (outfit: Outfit) => {
    return outfit.items.map(item => item.color);
  };
  
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  return (
    <div className="flex flex-col h-[100dvh]">
      <DialogHeader className="px-6 pt-6 pb-0">
        <div className="flex items-center justify-between mb-2">
          <DialogTitle className="text-lg font-semibold">{outfit.name}</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </div>
        <DialogDescription>
          {outfit.items.length} items in this outfit
        </DialogDescription>
      </DialogHeader>
      
      <div className="flex-1 overflow-y-auto overscroll-bounce p-6">
        <div className="space-y-4">
          <div 
            className="aspect-square overflow-hidden rounded-lg relative cursor-pointer"
            onClick={() => setIsImageZoomOpen(true)}
          >
            {outfit.imageUrl ? (
              <>
                <img 
                  src={outfit.imageUrl} 
                  alt={outfit.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 p-1.5 bg-black/40 rounded-full">
                  <ZoomIn className="h-4 w-4 text-white" />
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Shirt className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>
          
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              Items in this outfit <span className="ml-2 text-xs text-muted-foreground">({outfit.items.length})</span>
            </h4>
            <div className="space-y-2">
              {outfit.items.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => onItemClick && onItemClick(item)}
                >
                  <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Color palette</h4>
            <div className="flex gap-2">
              {getOutfitColorPalette(outfit).map((color, index) => (
                <div 
                  key={index}
                  className="w-8 h-8 rounded-full border border-border/50"
                  style={{ 
                    backgroundColor: color.toLowerCase(),
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {onDelete && (
        <div className="p-4 border-t">
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={handleDeleteClick}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Outfit
          </Button>
        </div>
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
        imageUrl={outfit.imageUrl || (outfit.items[0]?.imageUrl || "")}
        alt={outfit.name}
        isOpen={isImageZoomOpen}
        onClose={() => setIsImageZoomOpen(false)}
      />
    </div>
  );
};

export default OutfitDetails;
