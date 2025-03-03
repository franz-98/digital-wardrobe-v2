
import React from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ImageZoomProps {
  imageUrl: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageZoom = ({ imageUrl, alt, isOpen, onClose }: ImageZoomProps) => {
  const [scale, setScale] = React.useState(1);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handleReset = () => {
    setScale(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 sm:max-w-[90vw] max-h-[90vh] w-auto h-auto bg-background/95 flex flex-col">
        <div className="p-4 flex justify-between items-center border-b">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset
            </Button>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
          <div style={{ transform: `scale(${scale})`, transition: "transform 0.2s ease" }}>
            <img 
              src={imageUrl} 
              alt={alt} 
              className="max-w-full max-h-[70vh] object-contain"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageZoom;
