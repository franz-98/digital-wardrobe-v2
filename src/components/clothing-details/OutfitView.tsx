
import { ChevronLeft, Shirt } from "lucide-react";
import { DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Outfit } from "@/components/wardrobe/types";

interface OutfitViewProps {
  outfit: Outfit;
  onBackClick: () => void;
}

const OutfitView = ({ outfit, onBackClick }: OutfitViewProps) => {
  return (
    <>
      <DialogHeader className="px-4 pt-4 pb-2">
        <div className="flex items-center mb-2">
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
        <DialogDescription>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {outfit.items.length} indumenti
          </Badge>
        </DialogDescription>
      </DialogHeader>
      
      <div className="relative aspect-square w-full overflow-hidden mb-2">
        <img 
          src={outfit.imageUrl || outfit.items[0]?.imageUrl} 
          alt={outfit.name} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="px-4 pb-4 space-y-3">
        <h3 className="text-sm font-medium flex items-center gap-1">
          <Shirt className="h-4 w-4" /> Indumenti in questo outfit
        </h3>
        
        <div className="space-y-2">
          {outfit.items.map((outfitItem) => (
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
  );
};

export default OutfitView;
