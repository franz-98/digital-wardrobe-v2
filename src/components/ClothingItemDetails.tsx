
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { X, Calendar, Tag, Info, Shirt, ChevronLeft } from "lucide-react";
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
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [viewMode, setViewMode] = useState<"item" | "outfit">("item");
  
  // Close dropdown when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (open) {
        onOpenChange(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [open, onOpenChange]);
  
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
    setSelectedOutfit(outfit);
    setViewMode("outfit");
    toast({
      title: "Outfit selezionato",
      description: `Hai selezionato l'outfit: ${outfit.name}`,
    });
  };

  const handleBackToItem = () => {
    setViewMode("item");
    setSelectedOutfit(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-auto">
        {viewMode === "outfit" && selectedOutfit ? (
          // Outfit View - Redesigned for better clarity
          <>
            <DialogHeader className="pb-2">
              <div className="flex items-center mb-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="mr-2" 
                  onClick={handleBackToItem}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <DialogTitle className="text-xl font-bold">{selectedOutfit.name}</DialogTitle>
              </div>
              <DialogDescription>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {selectedOutfit.items.length} indumenti
                </Badge>
              </DialogDescription>
            </DialogHeader>
            
            <div className="relative aspect-square w-full overflow-hidden rounded-md mb-4 bg-secondary/10">
              <img 
                src={selectedOutfit.imageUrl || selectedOutfit.items[0]?.imageUrl} 
                alt={selectedOutfit.name} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium flex items-center gap-1">
                <Shirt className="h-4 w-4" /> Indumenti in questo outfit
              </h3>
              
              {selectedOutfit.items.map((outfitItem) => (
                <Card 
                  key={`outfit-item-${outfitItem.id}`}
                  className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-3 p-3">
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-secondary/20">
                      <img 
                        src={outfitItem.imageUrl} 
                        alt={outfitItem.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{outfitItem.name}</h4>
                      <div className="flex items-center gap-2 mt-1 mb-2">
                        <Badge variant="outline" className="text-xs bg-secondary/10">
                          {outfitItem.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ 
                              backgroundColor: outfitItem.color.toLowerCase() === "white" ? "#EEEEEE" : outfitItem.color,
                              border: outfitItem.color.toLowerCase() === "white" ? "1px solid #000000" : "none"
                            }}
                          />
                          <span className="text-xs text-muted-foreground">{outfitItem.color}</span>
                        </div>
                      </div>
                      
                      {outfitItem.metadata && (
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
                          {outfitItem.metadata.brand && (
                            <>
                              <span className="text-muted-foreground">Brand:</span>
                              <span className="font-medium">{outfitItem.metadata.brand}</span>
                            </>
                          )}
                          {outfitItem.metadata.material && (
                            <>
                              <span className="text-muted-foreground">Materiale:</span>
                              <span className="font-medium">{outfitItem.metadata.material}</span>
                            </>
                          )}
                          {outfitItem.metadata.season && (
                            <>
                              <span className="text-muted-foreground">Stagione:</span>
                              <span className="font-medium">{outfitItem.metadata.season}</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : (
          // Item View - Redesigned with image on top and details below
          <>
            <DialogHeader className="pb-2">
              <DialogTitle className="text-xl font-bold">{item.name}</DialogTitle>
            </DialogHeader>
            
            {/* Full width image at the top */}
            <div className="w-full aspect-square overflow-hidden rounded-md mb-4">
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            
            {/* Item details section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {item.category}
                </Badge>
                <div className="flex items-center gap-1 ml-auto">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ 
                      backgroundColor: item.color.toLowerCase() === "white" ? "#EEEEEE" : item.color,
                      border: item.color.toLowerCase() === "white" ? "1px solid #000000" : "none"
                    }}
                  />
                  <span className="text-sm">{item.color}</span>
                </div>
              </div>
              
              {/* Detailed metadata */}
              {item.metadata && (
                <Card className="shadow-sm border p-4">
                  <h3 className="text-sm font-medium flex items-center gap-1 mb-3">
                    <Info className="h-4 w-4" /> Dettagli dell'indumento
                  </h3>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    {item.metadata.dateTaken && (
                      <>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-muted-foreground">Data:</span>
                        </div>
                        <div className="font-medium">{formatDate(item.metadata.dateTaken)}</div>
                      </>
                    )}
                    
                    {item.metadata.brand && (
                      <>
                        <div className="flex items-center gap-1">
                          <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-muted-foreground">Brand:</span>
                        </div>
                        <div className="font-medium">{item.metadata.brand}</div>
                      </>
                    )}
                    
                    {item.metadata.material && (
                      <>
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Materiale:</span>
                        </div>
                        <div className="font-medium">{item.metadata.material}</div>
                      </>
                    )}
                    
                    {item.metadata.season && (
                      <>
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Stagione:</span>
                        </div>
                        <div className="font-medium">{item.metadata.season}</div>
                      </>
                    )}
                  </div>
                </Card>
              )}
            </div>
            
            {/* Related outfits section - moved below description */}
            {relatedOutfits && relatedOutfits.length > 0 && (
              <div className="mt-6 space-y-3">
                <Separator className="my-4" />
                <h3 className="text-sm font-medium flex items-center gap-1">
                  <Shirt className="h-4 w-4" />
                  Outfit con questo indumento
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {relatedOutfits.map((outfit) => (
                    <Card 
                      key={`outfit-${outfit.id}`}
                      className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleOutfitClick(outfit)}
                    >
                      <div className="aspect-square overflow-hidden bg-secondary/10">
                        <img 
                          src={outfit.imageUrl || outfit.items[0]?.imageUrl} 
                          alt={outfit.name} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-2">
                        <p className="text-sm font-medium truncate">{outfit.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {outfit.items.length} items
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        
        <DialogClose asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 rounded-full hover:bg-destructive/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ClothingItemDetails;
