
import React, { useRef, useEffect } from "react";
import { X } from "lucide-react";
import { DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

interface ImageZoomProps {
  imageUrl: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageZoom = ({ imageUrl, alt, isOpen, onClose }: ImageZoomProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (e.deltaY > 30) {
        onClose();
      }
    };
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    const containerElement = containerRef.current;
    if (containerElement && isOpen) {
      containerElement.addEventListener("wheel", handleScroll);
      window.addEventListener("keydown", handleEscape);
    }
    
    return () => {
      if (containerElement) {
        containerElement.removeEventListener("wheel", handleScroll);
      }
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DialogOverlay className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm" />
          </motion.div>
          
          <DialogContent 
            ref={containerRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-0 border-none bg-transparent shadow-none max-w-none max-h-none"
            onClick={onClose}
          >
            <motion.button 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              <X className="h-6 w-6" />
            </motion.button>
            
            <div 
              className="p-4 w-full h-full flex items-center justify-center" 
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ 
                  type: "spring", 
                  damping: 25, 
                  stiffness: 300 
                }}
                src={imageUrl} 
                alt={alt} 
                className="max-w-[90vw] max-h-[90vh] object-contain shadow-xl"
              />
            </div>
          </DialogContent>
        </>
      )}
    </AnimatePresence>
  );
};

export default ImageZoom;
