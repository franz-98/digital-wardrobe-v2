
import React from "react";

interface ImageCropPreviewProps {
  previewImageUrl: string;
}

export function ImageCropPreview({ previewImageUrl }: ImageCropPreviewProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="text-sm font-medium">Anteprima:</div>
      <div 
        className="w-[100px] h-[100px] rounded-full bg-center bg-no-repeat bg-cover border-4 border-background shadow-md"
        style={{ backgroundImage: previewImageUrl ? `url(${previewImageUrl})` : 'none' }}
      ></div>
    </div>
  );
}
