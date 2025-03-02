
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { X, Calendar, Tag, Info, Shirt } from "lucide-react";
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
import { toast } from "@/components/ui/use-toast";

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
  // Return null early if no item is provided
  if (!item) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    try {
      return format(new Date(dateString), "PPP");
    } catch {
      return "Invalid date";
    }
  };

  const handleOutfitClick = (outfit: Outfit) => {
    toast({
      title: "Outfit selezionato",
      description: `Hai selezionato l'outfit: ${outfit.name}`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-auto">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-xl font-bold">{item.name}</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {item.category}
            </Badge>
            <div 
              className="w-3 h-3 rounded-full inline-block" 
              style={{ 
                backgroundColor: item.color.toLowerCase() === "white" ? "#EEEEEE" : item.color,
                border: item.color.toLowerCase() === "white" ? "1px solid #000000" : "none"
              }}
            />
            <span className="text-sm text-muted-foreground">{item.color}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="aspect-square w-full overflow-hidden rounded-md mb-4 bg-secondary/20">
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        
        {item.metadata && (
          <div className="space-y-3 mb-4 bg-secondary/10 p-3 rounded-md">
            <h3 className="text-sm font-medium flex items-center gap-1">
              <Info className="h-4 w-4" /> Dettagli dell'indumento
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {item.metadata.dateTaken && (
                <>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">Data:</span>
                  </div>
                  <div>{formatDate(item.metadata.dateTaken)}</div>
                </>
              )}
              
              {item.metadata.brand && (
                <>
                  <div className="flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">Brand:</span>
                  </div>
                  <div>{item.metadata.brand}</div>
                </>
              )}
              
              {item.metadata.material && (
                <>
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Materiale:</span>
                  </div>
                  <div>{item.metadata.material}</div>
                </>
              )}
              
              {item.metadata.season && (
                <>
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Stagione:</span>
                  </div>
                  <div>{item.metadata.season}</div>
                </>
              )}
            </div>
          </div>
        )}
        
        {relatedOutfits && relatedOutfits.length > 0 && (
          <div className="space-y-3">
            <Separator />
            <h3 className="text-sm font-medium flex items-center gap-1">
              <Shirt className="h-4 w-4" />
              Outfit con questo indumento
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {relatedOutfits.map((outfit) => (
                <Card 
                  key={`outfit-${outfit.id}`}
                  className="overflow-hidden border cursor-pointer hover:border-primary/50 transition-all"
                  onClick={() => handleOutfitClick(outfit)}
                >
                  <div className="aspect-square overflow-hidden bg-secondary/20">
                    <img 
                      src={outfit.imageUrl || outfit.items[0]?.imageUrl} 
                      alt={outfit.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
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
            className="absolute top-2 right-2 hover:bg-destructive/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ClothingItemDetails;
