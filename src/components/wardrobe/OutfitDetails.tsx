
import React, { useState } from 'react';
import { Shirt, X, Trash2, Calendar, Tag } from "lucide-react";
import { DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
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

  const handleImageClick = () => {
    setIsImageZoomOpen(true);
  };

  // Get creation date (using current date as fallback)
  const creationDate = outfit.createdAt ? new Date(outfit.createdAt) : new Date();
  const formattedDate = creationDate.toLocaleDateString('default', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });

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
        <div className="space-y-6">
          <div 
            className="aspect-square overflow-hidden rounded-lg relative cursor-pointer"
            onClick={handleImageClick}
          >
            {outfit.imageUrl ? (
              <img 
                src={outfit.imageUrl} 
                alt={outfit.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Shirt className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>
          
          {/* Outfit Creation Details */}
          <div className="bg-muted/30 p-4 rounded-lg space-y-3">
            <h4 className="font-medium">Outfit Details</h4>
            
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Created on {formattedDate}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span>{outfit.season || 'All Seasons'}</span>
            </div>
            
            <div>
              <h5 className="text-sm font-medium mb-2 flex items-center">
                Color palette
              </h5>
              <div className="flex gap-2">
                {getOutfitColorPalette(outfit).map((color, index) => (
                  <Popover key={index}>
                    <PopoverTrigger asChild>
                      <div 
                        className="w-8 h-8 rounded-full border border-border/50 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all"
                        style={{ 
                          backgroundColor: color.toLowerCase(),
                          boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                        }}
                      />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-2">
                      <p className="text-sm font-medium">{color}</p>
                    </PopoverContent>
                  </Popover>
                ))}
              </div>
            </div>
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
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                      <Badge 
                        variant="outline" 
                        className="text-xs h-4 px-1.5 bg-secondary/10"
                      >
                        {item.color}
                      </Badge>
                    </div>
                  </div>
                </div>
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
