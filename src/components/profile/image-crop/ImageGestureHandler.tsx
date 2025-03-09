
import { useState } from "react";

interface ImageGestureHandlerProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  position: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
  onScaleChange: (scale: number) => void;
}

export function ImageGestureHandler({
  canvasRef,
  position,
  onPositionChange,
  onScaleChange
}: ImageGestureHandlerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
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
