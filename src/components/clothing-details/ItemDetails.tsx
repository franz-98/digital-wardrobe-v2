import { useState } from "react";
import { Calendar, Info, Tag } from "lucide-react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ClothingItem } from "@/components/wardrobe/types";
import ImageZoom from "@/components/wardrobe/ImageZoom";
import { motion } from "framer-motion";

interface ItemDetailsProps {
  item: ClothingItem;
  onDeleteClick: () => void;
  onDelete?: (id: string) => void;
  onImageClick?: (imageUrl: string) => void;
}

const ItemDetails = ({ item, onDeleteClick, onDelete, onImageClick }: ItemDetailsProps) => {
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false);
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    try {
      return format(new Date(dateString), "PPP");
    } catch {
      return "Invalid date";
    }
  };

  const handleImageClick = () => {
    setIsImageZoomOpen(true);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <motion.div 
          className="aspect-square rounded-lg overflow-hidden border cursor-pointer relative group"
          onClick={handleImageClick}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
        </motion.div>
        
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
      
      <ImageZoom 
        imageUrl={item.imageUrl}
        alt={item.name}
        isOpen={isImageZoomOpen}
        onClose={() => setIsImageZoomOpen(false)}
      />
    </div>
  );
};

export default ItemDetails;
