
import React, { useRef, useEffect } from "react";
import { X } from "lucide-react";
import { DialogContent, DialogOverlay } from "@/components/ui/dialog";

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
  
  if (!isOpen) return null;
  
  return (
    <>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm" />
      <DialogContent 
        ref={containerRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-0 border-none bg-transparent shadow-none max-w-none max-h-none"
        onClick={onClose}
      >
        <button 
          className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <X className="h-6 w-6" />
        </button>
        
        <div 
          className="p-4 w-full h-full flex items-center justify-center" 
          onClick={(e) => e.stopPropagation()}
        >
          <img 
            src={imageUrl} 
            alt={alt} 
            className="max-w-[90vw] max-h-[90vh] object-contain shadow-xl"
          />
        </div>
      </DialogContent>
    </>
  );
};

export default ImageZoom;
