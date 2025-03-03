
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { X, Calendar, Tag, Info, Shirt, ChevronLeft } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

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
  
  // Close dialog when scrolling
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

  // Check if the current item is part of an outfit (not a single clothing item)
  const isPartOfOutfit = () => {
    return relatedOutfits && relatedOutfits.some(outfit => 
      outfit.items.some(outfitItem => outfitItem.id === item.id)
    );
  }

  const handleOutfitClick = (outfit: Outfit) => {
    setSelectedOutfit(outfit);
    setViewMode("outfit");
    toast("Outfit selezionato", {
      description: `Hai selezionato l'outfit: ${outfit.name}`,
      duration: 1500,
    });
  };

  const handleBackToItem = () => {
    setViewMode("item");
    setSelectedOutfit(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md overflow-auto bg-background p-0">
        {viewMode === "outfit" && selectedOutfit ? (
          // Outfit View
          <>
            <DialogHeader className="px-4 pt-4 pb-2">
              <div className="flex items-center mb-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="mr-2 h-8 w-8" 
                  onClick={handleBackToItem}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <DialogTitle className="text-lg font-semibold">{selectedOutfit.name}</DialogTitle>
              </div>
              <DialogDescription>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {selectedOutfit.items.length} indumenti
                </Badge>
              </DialogDescription>
            </DialogHeader>
            
            <div className="relative aspect-square w-full overflow-hidden mb-2">
              <img 
                src={selectedOutfit.imageUrl || selectedOutfit.items[0]?.imageUrl} 
                alt={selectedOutfit.name} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            
            <div className="px-4 pb-4 space-y-3">
              <h3 className="text-sm font-medium flex items-center gap-1">
                <Shirt className="h-4 w-4" /> Indumenti in questo outfit
              </h3>
              
              <div className="space-y-2">
                {selectedOutfit.items.map((outfitItem) => (
                  <Card 
                    key={`outfit-item-${outfitItem.id}`}
                    className="overflow-hidden border shadow-sm"
                  >
                    <div className="flex gap-3 p-3">
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-secondary/20">
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
          </>
        ) : (
          // Item View - More schematic and organized
          <div className="flex flex-col h-full">
            <DialogHeader className="px-4 pt-4 pb-0">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-lg font-semibold">{item.name}</DialogTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onOpenChange(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>
            
            <div className="p-4 flex-1 overflow-auto">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="aspect-square rounded-lg overflow-hidden border">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Details</h3>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Category:</span>
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Color:</span>
                        <div className="flex items-center gap-1">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ 
                              backgroundColor: item.color.toLowerCase() === "white" ? "#EEEEEE" : item.color,
                              border: item.color.toLowerCase() === "white" ? "1px solid #DDDDDD" : "none"
                            }}
                          />
                          <span className="text-xs">{item.color}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {item.metadata?.brand && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Brand:</span>
                        <span className="text-xs font-medium">{item.metadata.brand}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {item.metadata && Object.keys(item.metadata).length > 0 && (
                <Card className="p-3 mb-4">
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                    <Info className="h-3.5 w-3.5" /> Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    {item.metadata.dateTaken && (
                      <>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Date:</span>
                        </div>
                        <div className="text-xs">{formatDate(item.metadata.dateTaken)}</div>
                      </>
                    )}
                    
                    {item.metadata.material && (
                      <>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <span>Material:</span>
                        </div>
                        <div className="text-xs">{item.metadata.material}</div>
                      </>
                    )}
                    
                    {item.metadata.season && (
                      <>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <span>Season:</span>
                        </div>
                        <div className="text-xs">{item.metadata.season}</div>
                      </>
                    )}
                  </div>
                </Card>
              )}
              
              {relatedOutfits && relatedOutfits.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                    <Shirt className="h-3.5 w-3.5" /> Related Outfits
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {relatedOutfits.map((outfit) => (
                      <Card 
                        key={`outfit-${outfit.id}`}
                        className="overflow-hidden border cursor-pointer hover:shadow-sm transition-shadow"
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
                        <div className="p-1.5">
                          <p className="text-xs font-medium truncate">{outfit.name}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ClothingItemDetails;
