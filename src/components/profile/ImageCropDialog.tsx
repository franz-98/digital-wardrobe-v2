
import { useEffect, useState, useRef } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface ImageCropDialogProps {
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
      setImageLoaded(true);
      
      // Initialize position to center the image
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        setPosition({
          x: (canvas.width - img.width) / 2,
          y: (canvas.height - img.height) / 2
        });
      }
      
      renderImage();
    };
    img.src = imageUrl;
    
    return () => {
      img.onload = null;
    };
  }, [imageUrl]);
  
  useEffect(() => {
    if (imageLoaded) {
      renderImage();
    }
  }, [position, scale, imageLoaded]);
  
  const renderImage = () => {
    if (!canvasRef.current || !imageLoaded) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw image with current position and scale
    const img = new Image();
    img.onload = () => {
      ctx.save();
      ctx.translate(position.x, position.y);
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);
      ctx.restore();
      
      // Update preview
      updatePreview();
    };
    img.src = imageUrl;
  };
  
  const updatePreview = () => {
    if (!canvasRef.current || !previewRef.current) return;
    
    const canvas = canvasRef.current;
    const preview = previewRef.current;
    
    // Calculate the center point of the canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Create a temporary canvas for the circular crop
    const tempCanvas = document.createElement('canvas');
    const size = 100; // Size of the preview
    tempCanvas.width = size;
    tempCanvas.height = size;
    const tempCtx = tempCanvas.getContext('2d');
    
    if (tempCtx) {
      // Create circular clipping path
      tempCtx.beginPath();
      tempCtx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      tempCtx.closePath();
      tempCtx.clip();
      
      // Draw from the main canvas to the preview canvas
      tempCtx.drawImage(
        canvas,
        centerX - size / 2, // Center the crop area
        centerY - size / 2,
        size,
        size,
        0,
        0,
        size,
        size
      );
      
      // Set the background image of the preview div
      preview.style.backgroundImage = `url(${tempCanvas.toDataURL()})`;
    }
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !canvasRef.current) return;
    
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    
    // Adjust scale with wheel (zoom in/out)
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.5, Math.min(3, scale + delta));
    setScale(newScale);
  };
  
  const handleComplete = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Create a new canvas for the final circular image
    const cropCanvas = document.createElement('canvas');
    const size = 200; // Final image size
    cropCanvas.width = size;
    cropCanvas.height = size;
    const cropCtx = cropCanvas.getContext('2d');
    
    if (cropCtx) {
      // Create circular clipping path
      cropCtx.beginPath();
      cropCtx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      cropCtx.closePath();
      cropCtx.clip();
      
      // Draw from the main canvas to the crop canvas
      cropCtx.drawImage(
        canvas,
        centerX - size / 2, // Center the crop area
        centerY - size / 2,
        size,
        size,
        0,
        0,
        size,
        size
      );
      
      // Convert to data URL and pass to onComplete
      const croppedImageUrl = cropCanvas.toDataURL('image/png');
      onComplete(croppedImageUrl);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ritaglia la foto profilo</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={300}
              height={300}
              className="border rounded-md cursor-move touch-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
            />
            
            {/* Overlay to indicate the circular crop area */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="flex items-center justify-center h-full">
                <div className="w-[150px] h-[150px] rounded-full border-2 border-dashed border-white"></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <div className="text-sm text-muted-foreground">
              Sposta l'immagine e usa la rotella del mouse per lo zoom.
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium">Anteprima:</div>
            <div 
              ref={previewRef} 
              className="w-[100px] h-[100px] rounded-full bg-center bg-no-repeat bg-cover border-4 border-background shadow-md"
            ></div>
          </div>
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
