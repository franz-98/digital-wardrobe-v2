
import { useState } from "react";
import { ChevronLeft, Shirt, X, ZoomIn } from "lucide-react";
import { DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Outfit } from "@/components/wardrobe/types";
import ImageZoom from "@/components/wardrobe/ImageZoom";

interface OutfitViewProps {
  outfit: Outfit;
  onBackClick: () => void;
  onDeleteClick?: () => void;
  onItemClick?: (itemId: string) => void;
  onImageClick?: (imageUrl: string) => void;
}

const OutfitView = ({ outfit, onBackClick, onDeleteClick, onItemClick, onImageClick }: OutfitViewProps) => {
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
      <DialogHeader className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2 h-8 w-8" 
              onClick={onBackClick}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-lg font-semibold">{outfit.name}</DialogTitle>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={onBackClick}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <DialogDescription>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {outfit.items.length} items
          </Badge>
        </DialogDescription>
      </DialogHeader>
      
      <div className="flex-1 overflow-y-auto overscroll-bounce">
        <div 
          className="aspect-square w-full overflow-hidden mb-2 relative cursor-pointer"
          onClick={handleImageClick}
        >
          <img 
            src={outfit.imageUrl || outfit.items[0]?.imageUrl} 
            alt={outfit.name} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-2 right-2 p-1.5 bg-black/40 rounded-full">
            <ZoomIn className="h-4 w-4 text-white" />
          </div>
        </div>
        
        <div className="px-4 pb-4 space-y-3">
          <h3 className="text-sm font-medium flex items-center gap-1">
            <Shirt className="h-4 w-4" /> Items in this outfit <span className="ml-1 text-muted-foreground">({outfit.items.length})</span>
          </h3>
          
          <div className="space-y-2">
            {outfit.items.map((outfitItem) => (
              <Card 
                key={`outfit-item-${outfitItem.id}`}
                className="overflow-hidden border shadow-sm cursor-pointer"
                onClick={() => handleItemClick(outfitItem.id)}
              >
                <div className="flex gap-3 p-3">
                  <div 
                    className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-secondary/20"
                  >
                    <img 
                      src={outfitItem.imageUrl} 
                      alt={outfitItem.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{outfitItem.name}</h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs bg-secondary/10">
                        {outfitItem.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <div 
                          className="w-2 h-2 rounded-full" 
                          style={{ 
                            backgroundColor: outfitItem.color.toLowerCase() === "white" ? "#EEEEEE" : outfitItem.color,
                            border: outfitItem.color.toLowerCase() === "white" ? "1px solid #DDDDDD" : "none"
                          }}
                        />
                        <span className="text-xs text-muted-foreground">{outfitItem.color}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {onDeleteClick && (
        <div className="p-4 border-t">
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={onDeleteClick}
          >
            <X className="h-4 w-4 mr-2" />
            Delete Outfit
          </Button>
        </div>
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
