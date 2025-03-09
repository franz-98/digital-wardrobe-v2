
import { useRef } from "react";
import { ImageRenderer } from "./ImageRenderer";
import { ImageGestureHandler } from "./ImageGestureHandler";
import { usePreviewGenerator } from "./PreviewGenerator";
import { useImageInitialization } from "./useImageInitialization";

interface ImageCropCanvasProps {
  imageUrl: string;
  position: { x: number; y: number };
  scale: number;
  onPositionChange: (position: { x: number; y: number }) => void;
  onScaleChange: (scale: number) => void;
  onPreviewUpdate: (previewUrl: string) => void;
  imageLoaded: boolean;
}

export function ImageCropCanvas({
  imageUrl,
  position,
  scale,
  onPositionChange,
  onScaleChange,
  onPreviewUpdate,
  imageLoaded
}: ImageCropCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Initialize image and center it
  const { imageSize } = useImageInitialization({
    imageUrl,
    canvasRef,
    onPositionChange,
    onImageLoad: () => {
      if (imageLoaded) {
        updatePreview();
      }
    }
  });
  
  // Handle preview generation
  const { updatePreview } = usePreviewGenerator({
    canvasRef,
    onPreviewUpdate
  });
  
  // Handle user interactions (mouse, touch, wheel)
  const { mouseHandlers, touchHandlers } = ImageGestureHandler({
    canvasRef,
    position,
    scale,
    onPositionChange,
    onScaleChange
  });
  
  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="border rounded-md cursor-move touch-none"
        {...mouseHandlers}
        {...touchHandlers}
      />
      
      {/* Image renderer (logic only) */}
      <ImageRenderer
        canvasRef={canvasRef}
        imageUrl={imageUrl}
        position={position}
        scale={scale}
        onUpdatePreview={updatePreview}
        imageLoaded={imageLoaded}
      />
      
      {/* Overlay to indicate the circular crop area */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="flex items-center justify-center h-full">
          <div className="w-[150px] h-[150px] rounded-full border-2 border-dashed border-white"></div>
        </div>
      </div>
    </div>
  );
}
