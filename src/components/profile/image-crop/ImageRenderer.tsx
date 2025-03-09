
import { useEffect } from "react";

interface ImageRendererProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imageUrl: string;
  position: { x: number; y: number };
  scale: number;
  onUpdatePreview: () => void;
  imageLoaded: boolean;
}

export function ImageRenderer({
  canvasRef,
  imageUrl,
  position,
  scale,
  onUpdatePreview,
  imageLoaded
}: ImageRendererProps) {
  // Render the image whenever position or scale changes
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
      onUpdatePreview();
    };
    img.src = imageUrl;
  };
  
  return null; // This is a logic-only component, no UI
}
