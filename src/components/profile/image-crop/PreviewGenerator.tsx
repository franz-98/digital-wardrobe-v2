
interface PreviewGeneratorProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onPreviewUpdate: (previewUrl: string) => void;
}

export function usePreviewGenerator({
  canvasRef,
  onPreviewUpdate
}: PreviewGeneratorProps) {
  const updatePreview = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    // Calculate the center point of the canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Create a temporary canvas for the circular crop
    const tempCanvas = document.createElement('canvas');
    // Set the size to match the visual guide size (150px)
    const size = 150;
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
  
  return { updatePreview };
}
