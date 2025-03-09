
import { useEffect, useState } from "react";

interface UseImageInitializationProps {
  imageUrl: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onPositionChange: (position: { x: number; y: number }) => void;
  onImageLoad: () => void;
}

export function useImageInitialization({
  imageUrl,
  canvasRef,
  onPositionChange,
  onImageLoad
}: UseImageInitializationProps) {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  
  // Initialize image position
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
      
      // Initialize position to center the image
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        onPositionChange({
          x: (canvas.width - img.width) / 2,
          y: (canvas.height - img.height) / 2
        });
      }
      
      onImageLoad();
    };
    img.src = imageUrl;
    
    return () => {
      img.onload = null;
    };
  }, [imageUrl]);
  
  return { imageSize };
}
