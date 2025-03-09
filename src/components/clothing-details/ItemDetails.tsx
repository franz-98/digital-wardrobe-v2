
import { useState, useEffect } from "react";
import { ClothingItem, Outfit } from "@/components/wardrobe/types";
import ImageZoom from "@/components/wardrobe/ImageZoom";
import ItemImagePreview from "./ItemImagePreview";
import ItemBasicDetails from "./ItemBasicDetails";
import ItemSpecifications from "./ItemSpecifications";
import WearHistory from "./WearHistory";

interface ItemDetailsProps {
  item: ClothingItem;
  onDeleteClick: () => void;
  onDelete?: (id: string) => void;
  onImageClick?: (imageUrl: string) => void;
  relatedOutfits?: Outfit[];
}

const ItemDetails = ({ item, onDeleteClick, onDelete, onImageClick, relatedOutfits = [] }: ItemDetailsProps) => {
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false);
  
  const handleImageClick = () => {
    setIsImageZoomOpen(true);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <ItemImagePreview 
          imageUrl={item.imageUrl} 
          alt={item.name} 
          onImageClick={handleImageClick} 
        />
        
        <ItemBasicDetails item={item} />
      </div>
      
      <ItemSpecifications metadata={item.metadata} />
      
      <WearHistory relatedOutfits={relatedOutfits} />
      
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
