
import { useState } from "react";

interface ImageGestureHandlerProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  position: { x: number; y: number };
  scale: number;
  onPositionChange: (position: { x: number; y: number }) => void;
  onScaleChange: (scale: number) => void;
}

export function ImageGestureHandler({
  canvasRef,
  position,
  scale,
  onPositionChange,
  onScaleChange
}: ImageGestureHandlerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(null);
  
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
    
    // Handle pinch zoom (two finger touch)
    if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches);
      setLastTouchDistance(distance);
      return;
    }
    
    // Handle drag (single finger touch)
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    });
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!canvasRef.current) return;
    
    e.preventDefault(); // Prevent scrolling
    
    // Handle pinch zoom (two finger touch)
    if (e.touches.length === 2 && lastTouchDistance !== null) {
      const newDistance = getTouchDistance(e.touches);
      const deltaDistance = newDistance - lastTouchDistance;
      
      // Adjust sensitivity for zoom
      const scaleFactor = deltaDistance * 0.01;
      const newScale = Math.max(0.5, Math.min(3, scale + scaleFactor));
      
      onScaleChange(newScale);
      setLastTouchDistance(newDistance);
      return;
    }
    
    // Handle drag (single finger touch)
    if (!isDragging) return;
    
    const touch = e.touches[0];
    onPositionChange({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y
    });
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
    setLastTouchDistance(null);
  };
  
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    
    // Adjust scale with wheel (zoom in/out)
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.5, Math.min(3, scale + delta));
    onScaleChange(newScale);
  };
  
  // Calculate distance between two touch points
  const getTouchDistance = (touches: React.TouchList): number => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };
  
  return {
    mouseHandlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp,
      onWheel: handleWheel,
    },
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchEnd,
    }
  };
}
