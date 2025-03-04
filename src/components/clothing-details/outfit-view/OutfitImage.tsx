
import React from "react";
import { ZoomIn } from "lucide-react";
import { motion } from "framer-motion";

interface OutfitImageProps {
  imageUrl: string | undefined;
  onImageClick: () => void;
}

const OutfitImage = ({ imageUrl, onImageClick }: OutfitImageProps) => {
  return (
    <motion.div 
      className="aspect-square w-full overflow-hidden mb-2 relative cursor-pointer"
      onClick={onImageClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
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
    </motion.div>
  );
};

export default OutfitImage;
