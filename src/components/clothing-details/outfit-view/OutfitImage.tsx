
import React, { useState } from "react";
import { motion } from "framer-motion";
import ImageZoom from "@/components/wardrobe/ImageZoom";

interface OutfitImageProps {
  imageUrl: string | undefined;
  onImageClick: () => void;
}

const OutfitImage = ({ imageUrl, onImageClick }: OutfitImageProps) => {
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false);
  
  const handleImageClick = () => {
    if (imageUrl) {
      // Directly open zoom view instead of calling onImageClick
      setIsImageZoomOpen(true);
    } else {
      onImageClick();
    }
  };
  
  return (
    <>
      <motion.div 
        className="aspect-square w-full overflow-hidden mb-2 relative cursor-pointer"
        onClick={handleImageClick}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <img 
          src={imageUrl} 
          alt="Outfit" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
      </motion.div>
      
      {imageUrl && (
        <ImageZoom 
          imageUrl={imageUrl}
          alt="Outfit"
          isOpen={isImageZoomOpen}
          onClose={() => setIsImageZoomOpen(false)}
        />
      )}
    </>
  );
};

export default OutfitImage;
