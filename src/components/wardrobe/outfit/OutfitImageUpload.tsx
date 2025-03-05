
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OutfitImageUploadProps {
  outfitId: string;
  onImageUploaded: (imageUrl: string) => void;
}

const OutfitImageUpload = ({ outfitId, onImageUploaded }: OutfitImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Only accept image files
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    // Create a FileReader to read the image
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      
      // Pass the image URL to the parent component
      onImageUploaded(imageUrl);
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      setIsUploading(false);
      
      toast({
        title: "Image uploaded",
        description: "Your outfit image has been updated",
      });
    };
    
    reader.onerror = () => {
      setIsUploading(false);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image",
        variant: "destructive"
      });
    };
    
    // Read the file as a data URL
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Button
        onClick={handleUploadClick}
        variant="outline"
        size="sm"
        className="gap-1"
        disabled={isUploading}
      >
        <ImagePlus className="h-4 w-4" />
        {isUploading ? "Uploading..." : "Add Image"}
      </Button>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </>
  );
};

export default OutfitImageUpload;
