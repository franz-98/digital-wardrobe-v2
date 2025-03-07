
import React from 'react';
import { Shirt } from "lucide-react";
import OutfitImageUpload from "@/components/wardrobe/outfit/OutfitImageUpload";

interface OutfitImageProps {
  imageUrl: string | undefined;
  outfitId: string;
  onImageClick: () => void;
  onImageUpdate?: (outfitId: string, imageUrl: string) => void;
}

const OutfitImage = ({ imageUrl, outfitId, onImageClick, onImageUpdate }: OutfitImageProps) => {
  const handleImageUploaded = (imageUrl: string) => {
    if (onImageUpdate) {
      onImageUpdate(outfitId, imageUrl);
    }
  };

  return (
    <div className="relative">
      <div 
        className="aspect-square overflow-hidden rounded-lg relative cursor-pointer"
        onClick={onImageClick}
      >
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Outfit" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Shirt className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </div>
      
      {onImageUpdate && (
        <div className="mt-2 flex justify-center">
          <OutfitImageUpload 
            outfitId={outfitId} 
            onImageUploaded={handleImageUploaded} 
          />
        </div>
      )}
    </div>
  );
};

export default OutfitImage;
