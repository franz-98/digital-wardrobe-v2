
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { X, Calendar, Tag, Info } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ClothingItem {
  id: string;
  name: string;
  category: string;
  color: string;
  imageUrl: string;
  metadata?: {
    dateTaken?: string;
    brand?: string;
    material?: string;
    season?: string;
  };
}

interface Outfit {
  id: string;
  name: string;
  items: ClothingItem[];
  imageUrl?: string;
}

interface ClothingItemDetailsProps {
  item: ClothingItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  relatedOutfits?: Outfit[];
}

const ClothingItemDetails = ({ 
  item, 
  open, 
  onOpenChange,
  relatedOutfits = []
}: ClothingItemDetailsProps) => {
  if (!item) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    try {
      return format(new Date(dateString), "PPP");
    } catch {
      return "Invalid date";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{item.name}</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {item.category}
            </Badge>
            <div 
              className="w-3 h-3 rounded-full inline-block" 
              style={{ 
                backgroundColor: item.color.toLowerCase() === "white" ? "#EEEEEE" : item.color 
              }}
            />
            <span className="text-sm text-muted-foreground">{item.color}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="aspect-square w-full overflow-hidden rounded-md mb-4">
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {item.metadata && (
          <div className="space-y-2 mb-4">
            <h3 className="text-sm font-medium flex items-center gap-1">
              <Info className="h-4 w-4" /> Item Details
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {item.metadata.dateTaken && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">Date:</span>
                </div>
              )}
              {item.metadata.dateTaken && (
                <div>{formatDate(item.metadata.dateTaken)}</div>
              )}
              
              {item.metadata.brand && (
                <div className="flex items-center gap-1">
                  <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">Brand:</span>
                </div>
              )}
              {item.metadata.brand && (
                <div>{item.metadata.brand}</div>
              )}
              
              {item.metadata.material && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Material:</span>
                </div>
              )}
              {item.metadata.material && (
                <div>{item.metadata.material}</div>
              )}
              
              {item.metadata.season && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Season:</span>
                </div>
              )}
              {item.metadata.season && (
                <div>{item.metadata.season}</div>
              )}
            </div>
          </div>
        )}
        
        {relatedOutfits && relatedOutfits.length > 0 && (
          <div className="space-y-3">
            <Separator />
            <h3 className="text-sm font-medium">Outfits with this item</h3>
            <div className="grid grid-cols-2 gap-2">
              {relatedOutfits.map((outfit) => (
                <Card key={outfit.id} className="overflow-hidden border">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={outfit.imageUrl || outfit.items[0]?.imageUrl} 
                      alt={outfit.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium truncate">{outfit.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {outfit.items.length} items
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        <DialogClose asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ClothingItemDetails;
