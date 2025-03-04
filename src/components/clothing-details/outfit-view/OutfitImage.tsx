
import React from "react";
import { ZoomIn } from "lucide-react";

interface OutfitImageProps {
  imageUrl: string | undefined;
  onImageClick: () => void;
}

const OutfitImage = ({ imageUrl, onImageClick }: OutfitImageProps) => {
  return (
    <div 
      className="aspect-square w-full overflow-hidden mb-2 relative cursor-pointer"
      onClick={onImageClick}
    >
      <img 
        src={imageUrl} 
        alt="Outfit" 
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute bottom-2 right-2 p-1.5 bg-black/40 rounded-full">
        <ZoomIn className="h-4 w-4 text-white" />
      </div>
    </div>
  );
};

export default OutfitImage;
