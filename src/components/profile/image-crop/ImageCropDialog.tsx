
import { useState, useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { ImageCropCanvas } from "./ImageCropCanvas";
import { ImageCropPreview } from "./ImageCropPreview";
import { ImageCropControls } from "./ImageCropControls";

export interface ImageCropDialogProps {
  imageUrl: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (croppedImageUrl: string) => void;
  onCancel: () => void;
}

export function ImageCropDialog({
  imageUrl,
  open,
  onOpenChange,
  onComplete,
  onCancel
}: ImageCropDialogProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string>("");
  
  // Load image and initialize position
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = imageUrl;
    
    return () => {
      img.onload = null;
    };
  }, [imageUrl]);
  
  const handlePositionChange = (newPosition: { x: number, y: number }) => {
    setPosition(newPosition);
  };
  
  const handleScaleChange = (newScale: number) => {
    setScale(newScale);
  };
  
  const handlePreviewUpdate = (previewUrl: string) => {
    setPreviewImageUrl(previewUrl);
  };
  
  const handleComplete = () => {
    if (previewImageUrl) {
      onComplete(previewImageUrl);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ritaglia la foto profilo</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <ImageCropCanvas
            imageUrl={imageUrl}
            position={position}
            scale={scale}
            onPositionChange={handlePositionChange}
            onScaleChange={handleScaleChange}
            onPreviewUpdate={handlePreviewUpdate}
            imageLoaded={imageLoaded}
          />
          
          <ImageCropControls />
          
          <ImageCropPreview previewImageUrl={previewImageUrl} />
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" /> Annulla
          </Button>
          
          <Button
            type="button"
            onClick={handleComplete}
            className="flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> Conferma
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
