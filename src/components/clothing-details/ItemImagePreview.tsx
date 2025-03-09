
import { useState } from "react";
import { motion } from "framer-motion";

interface ItemImagePreviewProps {
  imageUrl: string;
  alt: string;
  onImageClick: () => void;
}

const ItemImagePreview = ({ imageUrl, alt, onImageClick }: ItemImagePreviewProps) => {
  return (
    <motion.div 
      className="aspect-square rounded-lg overflow-hidden border cursor-pointer relative group"
      onClick={onImageClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <img 
        src={imageUrl} 
        alt={alt} 
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
    </motion.div>
  );
};

export default ItemImagePreview;
