
import { useState } from "react";

interface ImageCropState {
  isOpen: boolean;
  imageUrl: string | null;
}

export function useImageCrop() {
  const [cropState, setCropState] = useState<ImageCropState>({
    isOpen: false,
    imageUrl: null
  });
  
  const openCropDialog = (imageUrl: string) => {
    setCropState({
      isOpen: true,
      imageUrl
    });
  };
  
  const closeCropDialog = () => {
    setCropState(prev => ({
      ...prev,
      isOpen: false
    }));
    
    // Clean up the object URL after closing
    if (cropState.imageUrl) {
      URL.revokeObjectURL(cropState.imageUrl);
    }
  };
  
  return {
    isOpen: cropState.isOpen,
    imageUrl: cropState.imageUrl,
    openCropDialog,
    closeCropDialog
  };
}
