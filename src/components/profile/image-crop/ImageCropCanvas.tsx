
import { useRef, useEffect, useState } from "react";

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
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
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
      
      renderImage();
    };
    img.src = imageUrl;
    
    return () => {
      img.onload = null;
    };
  }, [imageUrl]);
  
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
      updatePreview();
    };
    img.src = imageUrl;
  };
  
  const updatePreview = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
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
      
      // Pass the preview image URL to parent
      onPreviewUpdate(tempCanvas.toDataURL());
    }
  };
  
  // Mouse event handlers
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
    
    onPositionChange({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!canvasRef.current) return;
    
    e.preventDefault(); // Prevent scrolling
    
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    });
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !canvasRef.current) return;
    
    e.preventDefault(); // Prevent scrolling
    
    const touch = e.touches[0];
    onPositionChange({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y
    });
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    
    // Adjust scale with wheel (zoom in/out)
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.5, Math.min(3, scale + delta));
    onScaleChange(newScale);
  };
  
  return (
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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
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
